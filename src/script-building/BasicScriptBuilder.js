import { segments, segmentTags } from './segments';

// Stupidly builds a Script object.
// Scripts have the schema:
// {
//  lines: list<ScriptLine>
//  prompts: list<PromptObject>
// }
export function generateScript(topic, maxNumSegments) {
    const out = []

    const introSegments = segments.filter(s => s.tag === segmentTags.introduction && segmentHasTopic(s, topic));
    const chosenIntroSegment = getRandomElement(introSegments);
    out.push(chosenIntroSegment.id);

    let numPromptsToFulfill = maxNumSegments ;
    let availableStorySegments = segments.filter(s => s.tag === segmentTags.segment && segmentHasTopic(s, topic));
    while (numPromptsToFulfill > 0 && availableStorySegments.length > 0) {
        const chosenSegment = getRandomElement(availableStorySegments);
        out.push(chosenSegment.id)

        availableStorySegments = availableStorySegments.filter(s => s.id !== chosenSegment.id);
        numPromptsToFulfill -= 1;
    }

    const closingSegments = segments.filter(s => s.tag === segmentTags.closing && segmentHasTopic(s, topic));
    const chosenClosingSegment = getRandomElement(closingSegments);
    out.push(chosenClosingSegment.id);
    return out;
}

export function aggregateScriptData(segmentIds) {
    const script = {
        lines: [],
        prompts: [],
    };

    for (const segmentId of segmentIds) {
        console.log(segmentId);
        const eligibleSegments = segments.filter(s => s.id === segmentId);
        if (eligibleSegments.length !== 1) {
            throw new Error("FUCK, CAN'T BUILD THE SCRIPT");
        }
        script.lines.push(...eligibleSegments[0].lines);
        script.prompts.push(...eligibleSegments[0].prompts);
    }
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