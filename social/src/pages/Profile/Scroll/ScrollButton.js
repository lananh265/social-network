import React, {useState, useEffect} from 'react';
import {FaArrowCircleDown} from 'react-icons/fa';
import { Button } from './Styles';
	
const ScrollButton = () =>{
	
const [visible, setVisible] = useState(true)
	
const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
	if (scrolled > 0){
    // console.log("tắt icon")
	setVisible(false)
	}
	else if (scrolled <= 0){
    // console.log("mở icon")
	setVisible(true)
	}
};
	
const scrollToBottom = () =>{
	window.scrollTo({
	top: document.documentElement.scrollHeight,
	behavior: 'smooth'
	/* you can also use 'auto' behaviour
		in place of 'smooth' */
	});
};
	
window.addEventListener('scroll', toggleVisible);
useEffect( ()=>{
    scrollToBottom()
},[])	
return (
	<Button>
	<FaArrowCircleDown onClick={scrollToBottom}
	style={{display: visible ? 'inline' : 'none'}} />
	</Button>
);
}
	
export default ScrollButton;
