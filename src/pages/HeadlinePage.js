import React, { useState, useEffect } from 'react';

import { buildBasicScript } from '../script-building/BasicScriptBuilder.js'
import { isHeadlineWriter, getPlayerDataFromPlayerId } from '../utils/player-utils.js';
import { getRoomDataFromRoomId, setRoomHeadline } from '../utils/room-utils.js';
import { getRandomIdea } from '../utils/headline-ideas.js';
import { assignPrompts } from '../utils/scripts-utils.js';
import { getRandomEmoji } from '../utils/topic-to-emoji.js';
import { assignRoles } from '../utils/game-utils.js';
import PlayersAndRoles from '../components/PlayersAndRoles.js';

export default function HeadlinePage() {
    const [isUserHeadlineWriter, setIsUserHeadlineWriter] = useState(false);
    const [headlineWriterName, setHeadlineWriterName] = useState('');
    const [mostVotedTopic, setMostVotedTopic] = useState('');
    const [headline, setHeadline] = useState('');
    const [idea, setIdea] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [topicEmoji, setTopicEmoji] = useState('');

    useEffect(() => {
        const initializeRoom = async () => {
            setIsLoading(true);
            try {
                const playerId = localStorage.getItem('playerId');
                const playerData = await getPlayerDataFromPlayerId(playerId);
                const roomId = playerData.roomId;
                const roomData = await getRoomDataFromRoomId(roomId);
                if (roomId) {
                    setRoomId(roomId)
                    console.log("heres da roomdata", roomData)
                    console.log('heres ur id', playerId)
                    console.log('heres the host player id', roomData.hostPlayerId)
                    if (roomData.hostPlayerId === playerId) {
                        //const script = buildBasicScript(roomData.topic, 3);
                        //const assignments = assignPrompts(script.lines, script.prompts, playerData);
                        //console.log(assignments);
                        await assignRoles(roomId)
                    }
                    const fetchedIsHeadlineWriter = await isHeadlineWriter(playerId);
                    setIsUserHeadlineWriter(fetchedIsHeadlineWriter);
                    const fetchedHeadlineWriterData = await getPlayerDataFromPlayerId(roomData.headlineWriterId);
                    setHeadlineWriterName(fetchedHeadlineWriterData.playerName);
                    setMostVotedTopic(roomData.topic);
                    setTopicEmoji(getRandomEmoji(roomData.topic))
                    setRoomName(roomData.roomName);

                }
            } catch (error) {
                console.error('Error checking headline writer status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeRoom();
    }, []);

    const handleInputChange = (event) => {
        setHeadline(event.target.value);
    };

    const handleSubmit = async (e) => {
        const playerId = localStorage.getItem('playerId');
        const playerData = await getPlayerDataFromPlayerId(playerId);
        const roomId = playerData.roomId;
        await setRoomHeadline(roomId, headline)
    }

    const handleIdeaRequest = () => {
        const newIdea = getRandomIdea(mostVotedTopic);
        setIdea(newIdea);
    }

    return isLoading ? <div className="flex justify-center items-center mt-4 text-2xl"><p className="animate-text bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">Loading</p></div> : (
        <div>
            <p className='mt-4'>{roomName}</p>
            <p className='mt-2'>Topic: {topicEmoji} {mostVotedTopic}</p>
            <PlayersAndRoles roomId={roomId} />

            {!isUserHeadlineWriter &&
                <p> {headlineWriterName} is writing the headline...</p>
            }

            {isUserHeadlineWriter && (
                <>
                    <p className='mt-2'>You are the headline writer</p>
                    <input
                        className='text-black mt-2'
                        type='text'
                        placeholder='Enter the story headline'
                        onChange={handleInputChange}
                    />
                    <br/>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2' onClick={handleIdeaRequest}>Want an idea?</button>
                    {idea && <p className='mt-2'>Idea: {idea}</p>}
                    <br/>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleSubmit}>Submit</button>
                </>
            )}
        </div>
    );
};
