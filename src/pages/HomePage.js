import React, { useState } from 'react';
import CreateRoomForm from '../components/CreateRoomForm';
import About from '../components/About';
import AllRoomsList from '../components/AllRoomsList';
import TestHeadlineButton from '../testing/TestHeadlineButton';

export default function HomePage() {
    const [showCreateRoomButton, setShowCreateRoomButton] = useState(true);
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false); 

    const toggleFormVisibility = () => {
        setShowCreateRoomForm(!showCreateRoomForm);
        setShowCreateRoomButton(!showCreateRoomButton);
    }

    return (
        <div className='w-11/12 sm:w-1/3 mx-auto'>
            <TestHeadlineButton/>
            {showCreateRoomButton && <button className='satisfying-button w-full text-black h-12 mt-6' onClick={toggleFormVisibility}>Create Private Room</button>}
            {showCreateRoomForm && <CreateRoomForm/>}
            <About/>
            <AllRoomsList/>
        </div>
    );
    
}