// import { useState } from 'react';
//
// export default function useToken() {
//   const layTokenCu = () => {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
//   };
//   const [token, setToken] = useState(layTokenCu());
//   const luuToken = userToken => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     luuToken(userToken.token);
//   };
//   return{
//     luuToken: luuToken,
//     token
//   }
//
// }

import { useState } from 'react';

export default function useToken() {
  const layTokenCu = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  const [token, setToken] = useState(layTokenCu());

  const luuToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return{
    luuToken: luuToken,
    token
  }
}
