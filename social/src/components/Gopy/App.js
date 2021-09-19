import React, { useState } from 'react';
import s from '../Gioithieu/header.module.css'

import {GlobalStyle, sharedStyles, StyledFormWrapper,
    StyledForm, StyledInput, StyledTextArea,
    StyledButton, StyledFieldset, StyledError} from '../Gioithieu/cssform'
    
const initalState = {
  username: '',
  email: '',
  message: '',
  gender: ''
};

function App2() {
  const [state, setState] = useState(initalState);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(state);

    for (let key in state) {
      if (state[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');
    // const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const test = regex.test(state.email);
    // console.log(test);

    console.log("Succeeded!!!")
  };

  const handleInput = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState(prev => ({ ...prev, [inputName]: value }));
  };

  return (
    <>
      <GlobalStyle />

      <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
               <button className={s.button}>Đăng Xuất</button>
               &nbsp;&nbsp;&nbsp;
           </div>
       </div>

      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Nhập Thông Tin Góp Ý</h2>
          <label htmlFor="username">Username</label>
          <StyledInput
            type="text"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
          <label htmlFor="email">Email</label>
          <StyledInput
            type="email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
          <StyledFieldset>
            <legend>Gender</legend>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                checked={state.gender === 'female'}
                onChange={handleInput}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                checked={state.gender === 'male'}
                onChange={handleInput}
              />
              Male
            </label>
          </StyledFieldset>
          <label htmlFor="message">Message</label>
          <StyledTextArea
            name="message"
            value={state.message}
            onChange={handleInput}
          />
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}
          <StyledButton type="submit">Send </StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}

export default App2;