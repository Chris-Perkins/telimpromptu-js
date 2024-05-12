import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import JoinRoomPage from './pages/JoinRoomPage';
import WaitingRoomPage from './pages/WaitingRoomPage';
import HeadlinePage from './pages/HeadlinePage';
import TopicVotePage from './pages/TopicVotePage';
import { Route, Routes, Link } from 'react-router-dom'
import { SecretPage } from './components/SecretPage';
import { ScriptWritingPage } from './components/ScriptWritingPage';
import Footer from './components/Footer';
import PromptAnswering from './pages/PromptAnswering';

function App() {
  return (
    <div className='App'>
      <Link to='/' className='no-underline'>
          <h1 className='text-3xl font-bold mt-6'>Telimpromptu</h1>
      </Link>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='join-room' element={<JoinRoomPage/>}/>
        <Route path='/waiting-room' element={<WaitingRoomPage/>}/>
        <Route path='/headline' element={<HeadlinePage/>}/>
        <Route path='/topic-vote' element={<TopicVotePage/>}/>
        <Route path='/secret-page' element={<SecretPage/>}/>
        <Route path='/script-writing' element={<ScriptWritingPage/>}/>
        <Route path='/prompt-answering' element={<PromptAnswering/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;