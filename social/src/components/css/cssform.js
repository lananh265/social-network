
// import React, { useState } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html {
  height: 100%
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(to bottom, #1f4037, #99f2c8);
  height: 100%;
  margin: 0;
  color: #555;
}
`;

export const sharedStyles = css`
background-color: #eee;
height: 40px;
border-radius: 5px;
border: 1px solid #ddd;
margin: 10px 0 20px 0;
padding: 20px;
box-sizing: border-box;
`;

export const StyledFormWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: auto;
padding: 0 20px;
`;

//form
export const StyledForm = styled.form`
width: 100%;
max-width: 790px;
padding: 40px;
background-color: #fff;
border-radius: 10px;
box-sizing: border-box;
box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.input`
display: block;
width: 100%;
${sharedStyles}
`;

export const StyledTextArea = styled.textarea`
background-color: #eee;
width: 100%;
min-height: 100px;
resize: none;
${sharedStyles}
`;
export const StyledButton = styled.button`
display: block;
background-color: #1D976C;
color: #fff;
font-size: 1.1rem;
border: 0;
border-radius: 5px;
height: 40px;

padding: 0 20px;
cursor: pointer;
box-sizing: border-box;
`;

export const StyledFieldset = styled.fieldset`
border: 1px solid #ddd;
border-radius: 5px;
padding: 10px;
margin: 20px 0;

legend {
  padding: 0 10px;
}

label {
  padding-right: 20px;
}

input {
  margin-right: 10px;
}
`;

export const StyledError = styled.div`
color: red;
font-weight: 800;
margin: 0 0 40px 0;
`;


export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 50px;
  padding-top: 30px;
  
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 20px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;


