



export default function Home() {
    const dangXuat = () =>{
        localStorage.removeItem("token")
        window.location.href = "/";
    }
  
    return (
   <div>
       <h1>Day la Home</h1>
       <button onClick={dangXuat}>Đăng Xuất</button>
       </div>
  );
  }
  
  
  
  