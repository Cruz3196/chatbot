import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import './Chats.css';

const Chats = ({ value, setValue, currentTitle, setCurrentTitle, setUniqueTitles, isTyping, setIsTyping }) => {
  const [previousChats, setPreviousChats] = useState([]);
  const [message, setMessage] = useState(null);

  const getMessages = async () => {
    setPreviousChats(prevChats => [
      ...prevChats,
      { title: currentTitle || value, role: "user", content: value }
    ]);

    setIsTyping(true);

    const options = {
      method: "POST",
      body: JSON.stringify({ message: value }),
      headers: { "Content-Type": "application/json" }
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const assistantMessage = data.choices[0].message;
        setMessage(assistantMessage);
      } else {
        console.error('Invalid response structure:', data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }

    setValue(''); // Clear the input field
  };

  const updateCurrentTitle = useCallback(() => {
    if (!currentTitle && value) {
      setCurrentTitle(value);
    }
  }, [value, currentTitle, setCurrentTitle]);

  useEffect(() => {
    updateCurrentTitle();
  }, [value, updateCurrentTitle]);

  useEffect(() => {
    if (message) {
      setPreviousChats(prevChats => [
        ...prevChats,
        { title: currentTitle, role: message.role, content: message.content }
      ]);
    }
  }, [message, currentTitle]);

  useEffect(() => {
    const uniqueTitles = Array.from(new Set(previousChats.map(chat => chat.title)));
    setUniqueTitles(uniqueTitles);
  }, [previousChats, setUniqueTitles]);

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
