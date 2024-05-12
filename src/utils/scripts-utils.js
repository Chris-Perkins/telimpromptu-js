// call this every time someone answers a prompt
// but make sure someone doesnt get served a prompt already served!!!
export function getAvailablePrompts(segment, answers) {
    return segment.prompts
      .filter(prompt => !prompt.dependencies || prompt.dependencies.every(dep => dep in answers))
      .reduce((acc, prompt) => ({ ...acc, [prompt.id]: prompt.description }), {});
}

// Assigns prompts to the input list of players.
// Returns a map from player ID to the prompts they are assigned to.
//
// @details
// Players are not able to receive prompts that they will speak in the final
// script. For example, if the player assigned is to the "Host" role, they will
// not be eligible to receive any prompt used in a script line with the "Host"
// speaker.
//
// Attempts to assign in a way that balances the number of prompts a player has
// to fulfill. Does so in a lazy, not very well-done way. I'm gonna be honest.
//
// input:
// - scriptLines: list<ScriptLine>
//  - example: {speaker: "Host", content: 'Tonight we have a special treat for you all. We have {@zookeeper} the zookeeper here from the {!zoo-name}!' },
// - promptObjects: list of JSON objects representing the prompts to assign.
//                  Two schemas are expected:
//    1. Prompt: {id: string, description: string, dependencies: list<string>}
//    2. PromptGroup: {groupId: string, prompts: list<Prompt>}
// - list<Player>
//    - example: [{id: "1", role: "Host"}, {id: "2", role: "Cohost"}]
// output:
// - map<string, list<AssignedPrompt>>
export function assignPrompts(scriptLines, promptObjects, players) {
  const speakerToReferencedVariables = mapSpeakersToPromptsReferenced(scriptLines);

  // Output object; will store all players to a list of the prompts they've
  // been assigned to.
  const playerToAssignedPrompts = {};
  for (const player of players) {
    playerToAssignedPrompts[player.id] = [];
  }

  // TODO: Iterating through this based on the input order.
  // To better balance prompt assignments, the list we iterate through should
  // be sorted based on the number of prompts contained within a promptObject.
  // I.e.: If a list has prompt objects of size {1, 1, 3}, we should iterate in
  // the order {3, 1, 1}. We could do this through a custom sort on size of
  // getPrompts's result.
  // Not doing this cos it doesn't matter that much for V1.
  for (const promptObject of promptObjects) {
    const prompts = getPrompts(promptObject);

    // assign to an eligible player with the least amount of prompts assigned
    // to them already.
    let curMinPrompts = Infinity;
    let eligiblePlayerIds = [];
    for (const player of players) {
      const playerId = player.id;
      const isPlayerEligibleForPrompt = !(playerId in speakerToReferencedVariables) ||
        containsAny(speakerToReferencedVariables[playerId], prompts.map(p => p.id));
      if (!isPlayerEligibleForPrompt) {
        break;
      }

      const numPromptsAssignedToPlayer = playerToAssignedPrompts[playerId].length;
      if (numPromptsAssignedToPlayer <= curMinPrompts) {
        if (numPromptsAssignedToPlayer < curMinPrompts) {
          curMinPrompts = numPromptsAssignedToPlayer;
          eligiblePlayerIds = [];
        }
        eligiblePlayerIds.push(playerId);
      }
    }

    if (eligiblePlayerIds.length === 0) {
      throw new Error(`For some reason, couldn't assign prompt ${prompt}`)
    }

    const playerIdToAssign = getRandomElement(eligiblePlayerIds);
    for (const prompt of prompts) {
      playerToAssignedPrompts[playerIdToAssign].push(prompt);
    }
  }
  return playerToAssignedPrompts;
}

// Returns a random element from the given list
function getRandomElement(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// Returns true if any value in values is in the given set;
// returns false otherwise
function containsAny(set, values) {
  for (const value of values) {
    if (set.has(value)) {
        return true;
    }
  }
  return false;
}

// Returns all the prompts referenced by the input prompt object
function getPrompts(promptObject) {
  if (promptObject.hasOwnProperty("prompts")) {
    return promptObject.prompts;
  }
  return promptObject;
}

// Returns a map of speakers to the prompts that they will reference in the
// final script based on the input script lines.
function mapSpeakersToPromptsReferenced(scriptLines) {
  const speakerToReferencedVariables = {};
  for (const line of scriptLines) {
    const lineSpeaker = line.speaker;
    if (!speakerToReferencedVariables.has(lineSpeaker)) {
      speakerToReferencedVariables[lineSpeaker] = new Set();
    }

    const promptIdsReferenced = getReferencedPrompts(line.content);
    for (const promptId of promptIdsReferenced) {
      speakerToReferencedVariables[lineSpeaker].add(promptId);
    }
  }
  return speakerToReferencedVariables;
}

// Returns a list of prompt IDs referenced by a given ScriptLine's content.
//
// Example: "That's right {@Cohost}, {!dog_name} really did {!dog_action}"
// Output: ["dog_name", "dog_action"]
function getReferencedPrompts(scriptText) {
  // match against {!TOKEN}
  const promptIdRegex = /{!([^\s{}]+)}/g;
  const promptIds = [];
  let match;

  // Loop through all matches and extract tokens
  while ((match = promptIdRegex.exec(scriptText)) !== null) {
    promptIds.push(match[1]); // Add the matched token to the tokens array
  }
  return promptIds;
}

// input:
//  - text: string
//     - example: "Welcome to tonight's story, {#headline}. I'm {@cohost}. I {!cohost_activity} on the weekends."
//  - gameVariables: map<string: string>
//     - example: {"headline": "dog dead"}
//  - players: list<Player>
//     - example: [{role: "cohost", name: "chris"}]
//  - promptVariables: map {string: string}
//     - example: {"cohost_activity": "dig holes"}
// output: string
//  - example: "Welcome to tonight's story, dog dead. I'm chris. I dig holes on the weekends."
export function interpolateScriptLineContent(text, gameVariables, players, promptVariables) {
  let outputText = text;

  // match and replace {!TOKEN}
  outputText = outputText.replace(/{!(.*?)}/g, (match, promptVariableId) => {
    return promptVariables[promptVariableId.trim()] || match;
  });
  // match and replace {#TOKEN}
  outputText = outputText.replace(/{#(.*?)}/g, (match, gameVariableId) => {
    return gameVariables[gameVariableId.trim()] || match;
  });
  // match and replace {@TOKEN}
  outputText = outputText.replace(/{@(.*?)}/g, (match, roleName) => {
    const playersWithName = players.filter(p => p.role === roleName)
    if (playersWithName.length !== 1) {
      console.log("bad thing happened when interpolating script");
      return match;
    }
    return playersWithName[0].name;
  });

  return outputText;
}