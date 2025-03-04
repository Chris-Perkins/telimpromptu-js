import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRoomNameById, isRoomJoinable, isRoomPasswordCorrect, getRoomDataFromRoomId } from '../utils/room-utils.js';
import { savePlayerToDb, getPlayerDataFromPlayerId } from '../utils/player-utils.js';

export default function JoinRoomPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isJoinable, setIsJoinable] = useState(true);
    const [error, setError] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [formData, setFormData] = useState({
        playerName: '',
        password: ''
    });

    const roomId = location.state ? location.state.roomIdToJoin : undefined;
    const playerId = localStorage.getItem('playerId') ? localStorage.getItem('playerId') : undefined

    useEffect(() => {
        const initializePage = async () => {
            const roomData = await getRoomDataFromRoomId(roomId)
            setIsJoinable(roomData.isJoinable)
            if (playerId) {
                // TODO: only host sets isjoinable
                const playerData = await getPlayerDataFromPlayerId(playerId);
                if (playerData.roomId === roomId) {
                    navigate('/waiting-room') // TODO: update to currentPage
                }
            }
            const fetchedRoomName = await getRoomNameById(roomId);
            setRoomName(fetchedRoomName)
        };
        initializePage();
    }, [roomId, navigate, playerId]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchedIsRoomPasswordCorrect = await isRoomPasswordCorrect(roomId, formData.password);
        const fetchedIsRoomAvailableToJoin = await isRoomJoinable(roomId);
        if (!fetchedIsRoomPasswordCorrect) {
            setError('Wrong password');
            return;
        }
        if (!fetchedIsRoomAvailableToJoin) {
            setError('You can no longer join this room');
            return;
        }
        try {
            const result = await savePlayerToDb(formData.playerName, roomId);
            if (result.success) {
                localStorage.setItem('playerId', result.playerId)
                navigate('/waiting-room');
            } else {
                setError(result.errorMessage);
            }
        } catch (error) {
            setError('Failed saving player to database');
        }
    };

    return !isJoinable ? <div className='grid grid-cols-1 justify-items-center mt-8'>
                            <img src='/error.png' alt='tv error' className='rounded-lg' />
                            <p className='mt-2'>This room has started the game and is no longer joinable</p>
                        </div>
         : (
        <form div className='w-11/12 sm:w-1/3 mx-auto mt-6 text-black' onSubmit={handleSubmit}>
            <h3 className='mt-1 text-white'>Joining {roomName}</h3>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <input
                    className='mt-1'
                    type='text'
                    name='playerName'
                    value={formData.playerName}
                    onChange={handleChange}
                    placeholder='Your Name'
                    required
                />
            </div>
            <div>
                <input
                    className='mt-1'
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Room Password'
                    required
                />
            </div>
            <button className='satisfying-button text-black h-12 w-1/4 mt-2' type='submit'>Join Room</button>
        </form>
    );
}