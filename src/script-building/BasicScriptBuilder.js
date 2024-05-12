import { segments, segmentTags } from './segments';

// Stupidly builds a Script object.
// Scripts have the schema:
// {
//  lines: list<ScriptLine>
//  prompts: list<PromptObject>
// }
export function buildBasicScript(topic, maxNumSegments) {
    const script = {
        lines: [],
        prompts: [],
    };

    const introSegments = segments.filter(s => s.tag === segmentTags.introduction && segmentHasTopic(s, topic));
    const chosenIntroSegment = getRandomElement(introSegments);
    script.lines.push(...chosenIntroSegment.lines);
    script.prompts.push(...chosenIntroSegment.prompts);


    let numPromptsToFulfill = maxNumSegments ;
    let availableStorySegments = segments.filter(s => s.tag === segmentTags.segment && segmentHasTopic(s, topic));
    while (numPromptsToFulfill > 0 && availableStorySegments.length > 0) {
        const chosenSegment = getRandomElement(availableStorySegments);
        script.lines.push(...chosenSegment.lines);
        script.prompts.push(...chosenSegment.prompts);

        availableStorySegments = availableStorySegments.filter(s => s !== chosenSegment);
        numPromptsToFulfill -= 1;
    }

    const closingSegments = segments.filter(s => s.tag === segmentTags.closing && segmentHasTopic(s, topic));
    const chosenClosingSegment = getRandomElement(closingSegments);
    script.lines.push(...chosenClosingSegment.lines);
    script.prompts.push(...chosenClosingSegment.prompts);
    return script;
}

// Returns a random element from the given list
function getRandomElement(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function segmentHasTopic(segment, topic) {
    return segment.topic === topic || segment.topic === "any";
}