import React, { useEffect, useState } from 'react';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { getAvailablePromptsForPlayer, getRoomIdFromPlayerId } from '../utils/player-utils';

export default function PromptAnswering() {
    const [prompts, setPrompts] = useState([]);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        let unsubscribe;

        async function setupListener() {
            const playerId = localStorage.getItem('playerId');
            const roomId = await getRoomIdFromPlayerId(playerId);

            if (roomId) {
                const roomDocRef = doc(db, 'rooms', roomId);
                unsubscribe = onSnapshot(roomDocRef, async (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const fetchedPrompts = await getAvailablePromptsForPlayer(playerId);
                        setPrompts(fetchedPrompts);
                    }
                });
            }
        }

        setupListener();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const handleInputChange = (promptId, value) => {
        setResponses(prev => ({ ...prev, [promptId]: value }));
    };

    const handleSubmit = async (promptId) => {
        const playerId = localStorage.getItem('playerId');
        const roomId = await getRoomIdFromPlayerId(playerId);

        if (roomId && responses[promptId]) {
            try {
                const roomDocRef = doc(db, 'rooms', roomId);
                await updateDoc(roomDocRef, {
                    [`responses.${promptId}`]: responses[promptId]
                });
            } catch (error) {
                console.error('Error submitting response:', error);
            }
        }
    };

    return (
        <div>
            {prompts.map((prompt, index) => (
                <div className='mt-2' key={index}>
                    <p>{prompt.description}</p>
                    <input
                        type="text"
                        value={responses[prompt.id] || ''}
                        onChange={(e) => handleInputChange(prompt.id, e.target.value)}
                        placeholder="Your answer..."
                    />
                    <br/>
                    <button onClick={() => handleSubmit(prompt.id)}>Submit</button>
                </div>
            ))}
        </div>
    );
}
