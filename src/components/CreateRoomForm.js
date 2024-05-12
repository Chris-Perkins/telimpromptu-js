import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveRoomToDb, isRoomNameAvailable, assignHostToRoom } from '../utils/room-utils.js';
import { savePlayerToDb } from '../utils/player-utils.js';
import { generateSlug } from 'random-word-slugs';

export default function CreateRoomForm() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        playerName: '',
        roomName: '',
        password: ''
    });

    useEffect(() => {
        setFormData(prevFormData => {
            let wordSlug = generateSlug(2, { format: 'title' });

            if (wordSlug.endsWith('y')) {
                wordSlug = wordSlug.slice(0, -1) + 'ies'
            } else {
                wordSlug = wordSlug + 's'
            } 

            return {
                ...prevFormData,
                roomName: wordSlug
            };
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const available = await isRoomNameAvailable(formData.roomName);
            if (available) {
                const result = await saveRoomToDb(formData.roomName, formData.password);
                if (result.success) {
                    const roomId = result.roomId;
                    const playerResult = await savePlayerToDb(formData.playerName, roomId);
                    localStorage.setItem('playerId', playerResult.playerId)
                    await assignHostToRoom(roomId, localStorage.getItem('playerId'));
                    navigate('/waiting-room');
                } else {
                    setError('Could not save create room. Please try again.')
                }
            } else {
                setError('Room Name Taken')
            }
        } catch (e) {
            console.error('Error creating room: ', e);
        }
    };

    return (
        <form className='mt-6 text-black' onSubmit={handleSubmit}>
            {error && <p className='text-red-500'>{error}</p>}
            <div>
                <input
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
                    type='text'
                    name='roomName'
                    value={formData.roomName}
                    onChange={handleChange}
                    placeholder='Room Name'
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
            <button className='satisfying-button text-black h-12 w-1/3 mt-2' type='submit'>Create Room</button>
        </form>
    );
}