import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './components/test/header';
import App from './App'
import Parent from './components/chat/passData/Parent';
// import App from './components/test/list/App'
// import Chat from "./components/chat/chat2"

ReactDOM.render(
  <React.StrictMode>
     {/* <App /> */}
     <Parent />
  </React.StrictMode>,
  document.getElementById('root')
);
