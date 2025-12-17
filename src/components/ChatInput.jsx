import { useState } from 'react'
import dayjs from 'dayjs'
import { Chatbot } from 'supersimpledev'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  function saveInputText(event) {
    setInputText(event.target.value);
  }
  async function sendMessage() {
    setInputText('');
    let newChatMessages;
    if (inputText !== '') {
      newChatMessages = [
      ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          time : dayjs().valueOf(),
          id: crypto.randomUUID(),
        }
      ]
      setChatMessages(newChatMessages);
    }
    
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingImage} className="loading-spinner"/>,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        time : dayjs().valueOf(),
        id: crypto.randomUUID(),
      }
    ]);
  }
  function clearMessage() {
      if (chatMessages.length !== 0) {
        setTimeout(() => {
        setChatMessages([]);
        }, 1000)
      }
    }
  function onKeyDownEventHandler(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText('')
    }
  }
  return (
    <div className="chat-input-container">
      <input type="text" placeholder="Send message to Chatbot" size="30" className="chat-input" onChange={saveInputText} value={inputText} onKeyDown={onKeyDownEventHandler}/>
      {/* <button onClick={sendMessage} className="send-button">Send</button> */}
      <button onClick={sendMessage} className="svg-button-send"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></button>
      {/* <button onClick={clearMessage} className="clear-button">Clear</button> */}
      <button onClick={clearMessage} className="svg-button-clear"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
    </div>
  );
}