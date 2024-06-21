import React from 'react';
import './Header.css';
import chatgpt4 from '../../assets/chatgpt4.svg';

const Header = () => {
  return (
    <section className='header-container'>
      <div className='header'>
        <img src={chatgpt4} alt='' className='logo' />
        <span className='brand'>
          ChatBot 5.0
        </span>
      </div>
    </section>
  );
}

export default Header;
