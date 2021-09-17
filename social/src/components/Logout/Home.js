import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Home(){
    return (
        <div>
            {/* <h1>Home</h1> */}
            <button><Link to ="/about">About</Link></button>
            <button><Link to ="/contact">Contact</Link></button>
        </div>
    )
}