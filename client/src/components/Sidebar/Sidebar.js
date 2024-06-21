import React from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faInstagram} from '@fortawesome/free-brands-svg-icons'
import sideButton from '../../assets/sideButton.png'
import writeButton from '../../assets/writeButton.png'
import './Sidebar.css'


const Sidebar = ({ setValue, setMessage, setCurrentTitle, uniqueTitles, isSidebarOpen, onToggle}) => {
  const toggleSidebar = () => {
    onToggle();
  }


  const createNewChat = () => {
    setMessage(null) 
    setValue("")
    setCurrentTitle(null)
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null) 
    setValue("")
  }


  return (
    <>

      <div className='sidebar-header'>
        <button 
          className='toggleButton' 
          onClick={toggleSidebar}
        >
          <img src={sideButton} alt='toggle icon' className='toggleIcon'/>
        </button>
        <button className='chatBtn' onClick={createNewChat}> 
            <img src={writeButton} alt='toggle icon'className='toggleIcon'/>
        </button>
      </div>
      
      <section className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className='sideBar'>
          <div className='upperSide'>
              <div className='upperSideTop'>
                  <ul className="history">
                    {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                  </ul>
              </div>
          </div>
          <div className='lowerSide'>
            <div className='listItems'>
              <a href=''>
                <FontAwesomeIcon icon={faGithub} className='listitemsImg'/>
                GitHub 
              </a>
            </div>
            <div className='listItems'>
              <a href=''>
                <FontAwesomeIcon icon={faLinkedin} className='listitemsImg'/>
                Linkedin
              </a>
            </div>
            <div className='listItems'>
              <a href=''>
                <FontAwesomeIcon icon={faInstagram}className='listitemsImg'/>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Sidebar
