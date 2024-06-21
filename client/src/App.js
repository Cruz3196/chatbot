import React, {useState} from 'react'
import {Sidebar, Header,Chats} from './components/index'
import './App.css'

const App = () => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [uniqueTitles, setUniqueTitles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // state for sidebar
  const [isTyping, setIsTyping] = useState(false);// state for typing indicator 

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }; 


  return (
    <div className={`App ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          <Sidebar 
            setValue={setValue} 
            setMessage={setMessage} 
            setCurrentTitle={setCurrentTitle}
            uniqueTitles = {uniqueTitles}
            isSidebarOpen = {isSidebarOpen}
            onToggle = {handleSidebarToggle}
            />
        <div className={`main ${!isSidebarOpen ? 'centered' : ''}`}>
          <Header />
            <Chats 
              value={value} 
              setValue={setValue} 
              message={message} 
              setMessage={setMessage} 
              currentTitle={currentTitle} 
              setCurrentTitle={setCurrentTitle}
              setUniqueTitles={setUniqueTitles}
              isTyping = {isTyping}
              setIsTyping={setIsTyping}
            />
        </div>
    </div>
  );
}

export default App;

