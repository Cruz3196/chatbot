import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import './Chats.css';

const Chats = ({ value, setValue, message, setMessage, currentTitle, setCurrentTitle, setUniqueTitles, isTyping, setIsTyping}) => {

  const [previousChats, setPreviousChats] = useState([]);
  

  const getMessages = async () => {
    // simulating typing indicator for the assistant
    setIsTyping(true) // set typing indicator to true
    const options = {
      method: "POST",
      body: JSON.stringify({ message: value }),
      headers: { "Content-Type": "application/json" }
    };
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false); // set typing indicator to false 
    }
  };

  useEffect(() => {
    if (value && message) {
      if (!currentTitle) {
        setCurrentTitle(value);
      }
      setPreviousChats(prevChats => {
        const newChats = [
          ...prevChats,
          { title: currentTitle || value, role: "user", content: value },
          { title: currentTitle || value, role: message.role, content: message.content }
        ];
        const uniqueTitles = Array.from(new Set(newChats.map(chat => chat.title)));
        setUniqueTitles(uniqueTitles);
        return newChats;
      });
    }
  }, [message]);

  const currentChat = previousChats.filter(chat => chat.title === currentTitle);


  return (
    <>

      <section className='feed'>
        {currentChat.map((chatMessage, index) => (
          <li key={index} className={`chat-bubble ${chatMessage.role === 'user' ? 'user' : 'assistant'}`}>
            <p>{chatMessage.content}</p>
          </li>
        ))}
        {isTyping && (
          <li className='chat-bubble assistant'>
            <img src='' alt='avatar' className='avatar'/>
            <p className='role'></p>
            <p>Assistant is typing...</p>
          </li>
        )}
      </section>

      <div className='chatFooter'>
        <div className="input-container">
          <div className='inp'>
            <input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type='text' 
              placeholder='Message Chatbot...' 
            />
            <button className='send' onClick={getMessages}>
              <FontAwesomeIcon icon={faCircleUp} alt='send' className='sendBtn' id='submit' />
            </button>
            <button className='attachment'>
              <FontAwesomeIcon icon={faPaperclip} alt='attachment' className='attachmentBtn' />
            </button>
          </div>
          <p className='info'>
            ChatBot. Free Research Preview. Our Goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve. 
          </p>
        </div>
      </div>

    </>
  );
}

export default Chats;


