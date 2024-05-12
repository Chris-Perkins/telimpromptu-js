import React, { useState, useEffect } from 'react';
import { roomsCollectionRef } from '../config/firebase';
import { onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AllRoomsList() {
    const navigate = useNavigate();
    const [roomsList, setRoomsList] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(roomsCollectionRef, (querySnapshot) => {
            const fetchedRoomList = [];
            querySnapshot.forEach((doc) => {
                fetchedRoomList.push({
                    id: doc.id, 
                    ...doc.data() 
                });
            });
            setRoomsList(fetchedRoomList);
        });
    
        return () => unsubscribe();
    }, []);
    

    const handleRoomClick = room => async () => {
        navigate('/join-room', { state: { roomIdToJoin: room.id } });
    };

    return (
        <div className='w-full mt-2'>
            <div className='bg-[rgb(52,52,92)] p-2.5 rounded-md overflow-y-auto max-h-[252px]'>
                <p>{roomsList.length} Games Currently Happening</p>
                {roomsList.map(room => (
                    <div className='mt-2' key={room.id}>
                        <a className='bg-indigo-700 hover:bg-indigo-500 cursor-pointer text-white p-1 block' onClick={handleRoomClick(room)}>
                            {room.roomName || 'Unnamed Room'}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}