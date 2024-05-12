const topicToEmojiMap = new Map();

topicToEmojiMap.set('sports', ['🏐', '🏀', '🏉'])
topicToEmojiMap.set('politics', ['🏛️'])
topicToEmojiMap.set('crime', ['🔪', '🕵️'])
topicToEmojiMap.set('other', ['🗣️', '📰'])

export function getTopicToEmojiMap() {
    return topicToEmojiMap;
}

export function getRandomEmoji(topic) {
    if (!topic) {
        return ''
    } else {
        const emojis = getTopicToEmojiMap().get(topic.toLowerCase());
        if (!emojis || emojis.length === 0) {
            return '';
        }
        const randomIndex = Math.floor(Math.random() * emojis.length);
        return emojis[randomIndex];
    }
}