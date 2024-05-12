import React, { useState, useEffect } from 'react';
import { playerCollectionRef } from '../config/firebase.js';
import { doc, query, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { getRoomIdFromPlayerId } from '../utils/player-utils.js';
import { getRoomNameById, setIsRoomJoinable } from '../utils/room-utils.js';
import { startGameFromWaitingRoom } from '../utils/game-utils.js';

export default function WaitingRoomPage() {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [readyToStart, setReadyToStart] = useState(false);
    const [playersList, setPlayersList] = useState([]);

    useEffect(() => {
        const initializeRoom = async () => {
            const fetchedRoomId = await getRoomIdFromPlayerId(localStorage.getItem('playerId'));
            if (fetchedRoomId) {
                setRoomId(fetchedRoomId);
                try {
                    const fetchedRoomName = await getRoomNameById(fetchedRoomId);
                    setRoomName(fetchedRoomName);
                } catch (error) {
                    console.error('Error fetching room name:', error);
                }
            }
        };
        initializeRoom();
    }, []);

    useEffect(() => {
        if (!roomId) return;

        const q = query(playerCollectionRef, where('roomId', '==', roomId));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const players = [];
            let allReady = true;
            querySnapshot.forEach((doc) => {
                const player = doc.data();
                player.docId = doc.id;
                players.push(player);
                if (!player.isReady) {
                    allReady = false;
                }
            });
            setPlayersList(players);
            setReadyToStart(players.length > 2);

            if (players.length > 2 && allReady) {
                const result = await startGameFromWaitingRoom(roomId);
                if (result.success) {
                    setIsRoomJoinable(roomId, false)
                    navigate('/topic-vote');
                }
            }
        });

        return () => unsubscribe();
    }, [roomId, navigate]);

    // TODO: cloud based function for checking heartbeat and removing players

    const handleClick = async () => {
        const playerId = localStorage.getItem('playerId');
        const playerDocRef = doc(playerCollectionRef, playerId);
        await updateDoc(playerDocRef, {
            isReady: true
        });
    };

    return (
        <div>
            <p className='text-2xl mt-2'>Waiting Room for <i>{roomName}</i></p>

            <p className='mt-2'>{readyToStart ? '💡 Once you start the game, you won\'t be able to add more players' : ''}</p>
            <button
                className='mt-3 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-75 hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={!readyToStart}
                onClick={handleClick}>
                {readyToStart ? 'Start Game' : `Need ${3 - playersList.length} more players to start`}
            </button>
            <br/>

            <div className='bg-[rgb(52,52,92)] p-2.5 rounded-md overflow-y-auto mt-2 inline-block'>
                <p><u>Players</u></p>
                {playersList.map(player => (
                    <div key={player.id}>
                        {readyToStart ? (player.isReady ? '✅  ' : '⏳  ') : ''}
                        {player.playerName || 'Unnamed Player'}
                        {player.docId === localStorage.getItem('playerId') ? ' (you)' : ''}
                    </div>
                ))}
            </div>
            <br/>
            <Link to='/'>
                <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2'>
                    ← Leave Room
                </button>
            </Link>
        </div>
    );
}
