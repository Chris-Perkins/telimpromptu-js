import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { playerCollectionRef } from '../config/firebase.js';
import { getRoomIdFromPlayerId, isAllTopicVotesIn } from '../utils/player-utils.js';
import { tallyVotes } from '../utils/game-utils.js';

export default function TopicVotePage() {
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const initializeVote = async () => {
            const playerId = localStorage.getItem('playerId');
            const fetchedRoomId = await getRoomIdFromPlayerId(playerId);
            setRoomId(fetchedRoomId);
        };
        initializeVote();
    }, []);

    useEffect(() => {
        if (!roomId) return;

        const q = query(playerCollectionRef, where("roomId", "==", roomId));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const allVotesIn = await isAllTopicVotesIn(roomId);
            if (allVotesIn) {
                await tallyVotes(roomId);
                navigate('/headline');
            }
        });

        return () => unsubscribe(); 
    }, [roomId, navigate]);

    const submitVote = async (vote) => {
        const playerId = localStorage.getItem('playerId');
        if (playerId) {
            const playerDocRef = doc(playerCollectionRef, playerId);
            try {
                await updateDoc(playerDocRef, {
                    topicVote: vote
                });
                setVoteSubmitted(true);
            } catch (error) {
                console.error('Error updating vote:', error);
            }
        } else {
            console.error('No playerId found');
        }
    };

    return (
        <div>
            <h3>Vote on a story Topic</h3>
            {voteSubmitted && <p>Waiting for other players...</p>}
            {['Sports', 'Politics', 'Crime', 'Other'].map(topic => (
                <button 
                    key={topic}
                    className='satisfying-button text-black'
                    disabled={voteSubmitted}
                    style={{ margin: '0 12px 12px 0', width: '25%' }}
                    onClick={() => submitVote(topic)}
                >
                    {topic}
                </button>
            ))}
        </div>
    );
};
