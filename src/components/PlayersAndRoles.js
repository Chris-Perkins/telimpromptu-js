import React, { useState, useEffect } from 'react';
import { getPlayersInRoom } from '../utils/room-utils';

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

export default function PlayersAndRoles({ roomId }) {
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            setIsLoading(true);
            const response = await getPlayersInRoom(roomId);
            if (response) {
                setPlayers(response);
            }
            setIsLoading(false);
        };

        fetchPlayers();
    }, [roomId]);

    if (isLoading) {
        return <p>Loading players...</p>;
    }

    return (
        <div className='bg-[rgb(52,52,92)] p-2.5 rounded-md overflow-y-auto mt-2 inline-block'>
            <ul>
                {players.map(player => (
                    <li key={player.id}><span className='font-bold'>{capitalize(player.role) || ''}:</span> {player.playerName}</li>
                ))}
            </ul>
        </div>
    );
}