import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import { Chatbot } from 'supersimpledev'
import ChatMessages from './components/ChatMessages.jsx'
import Documentation from './assets/ChatApp_Documentation.pdf'
import './App.css'
import './components/Title.css'
import './responsive.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    Chatbot.addResponses({
      "hi" : "Hello there, What's up?",
    }, []);
  },[])
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <>
          <p className="title"><a href={Documentation} draggable="false" target='_blank' rel='noopener noreferrer'>ChatBot</a></p>
          <p className="welcome-message">
            Welcome to the chatbot project! Send a messsage<br/>using the textbox below
          </p>
          <p className="instructions">
            &gt;&gt; Ask me to flip a coin or roll a dice
          </p>
          <p className="thanks">
            - Credit to <a href='http://www.youtube.com/@SuperSimpleDev' target='_blank'>@SuperSimpleDev</a> for the original tutorial. I recreated the project as a<br/>learning exercise and added my own tweaks.
          </p>
        </>
      )}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
