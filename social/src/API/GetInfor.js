export default function GetInfor() {
    const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    return {token}
}