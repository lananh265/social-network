import { useState } from 'react';

export default function useToken() {
  const layTokenCu = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken? userToken: 0
  };
  const [token, setToken] = useState(layTokenCu());

  const luuToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.status);
  };

  return{
    luuToken: luuToken,
    token
  }
}