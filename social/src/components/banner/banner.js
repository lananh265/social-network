import "./banner.css"
import React,{useState} from 'react'
import {Icon} from 'react-icons-kit'
import {arrowRight} from 'react-icons-kit/feather/arrowRight'
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft'
import { motion } from 'framer-motion/dist/framer-motion'
const imgBoxVariants = {
  hidden:{
    x: 500,
    opacity: 0
  },
  visible:{
    x: 0,
    opacity: 1,
    transition:{
      delay: 0.4, duration: 0.4,
      
    }
  }
}

export default function Banner({children}){
const [step, setStep] = useState(1);

const handleLeftArrow=()=>{
  if(step===1){
    setStep(3);
  }else{
  setStep(step-1);
  }
}

const handleRightArrow=()=>{
  if(step===3){
    setStep(1);
  }else{
  setStep(step+1);
  }
}
const goToSlide1=()=>{
  setStep(1);
}

const goToSlide2=()=>{
  setStep(2);
}

const goToSlide3=()=>{
  setStep(3);
}

    return(
        <>
            <div className='wrapper'>

<div className='content'>

  <div className='left-arrow' onClick={handleLeftArrow}>
    <Icon icon={arrowLeft} size={28}/>
  </div>

 <div className='Banner'>
 {step===1&&<motion.div className='img-box' variants={imgBoxVariants}
       initial="hidden" animate="visible">
 <img className="Img" src="assets/post/LANA.VN.png" alt="" /></motion.div>}
 {step===2&&<motion.div  variants={imgBoxVariants}
       initial="hidden" animate="visible">
 <img className="Imge" src="assets/post/logoo.jpg" alt="" /></motion.div>}
 {step===3&&<motion.div  variants={imgBoxVariants}
       initial="hidden" animate="visible">
 <img className="Imge" src="assets/post/logo3.jpg" alt="" /></motion.div>}
</div>

  <div className='right-arrow' onClick={handleRightArrow}>
    <Icon icon={arrowRight} size={28}/>
  </div>

</div>
<div className='indicators-box'>

          {step===1&&<><div className='indicator active'></div>
          <div className='indicator' onClick={goToSlide2}></div>
          <div className='indicator' onClick={goToSlide3}></div></>}

          {step===2&&<><div className='indicator' onClick={goToSlide1}></div>
          <div className='indicator active'></div>
          <div className='indicator' onClick={goToSlide3}></div></>}

          {step===3&&<><div className='indicator' onClick={goToSlide1}></div>
          <div className='indicator' onClick={goToSlide2}></div>
          <div className='indicator active'></div></>}

      </div>

</div>


        {/* <div>
            
             <div className="Banner">
                <img
                className="Img"
                src="assets/post/LANA.VN.png"
                alt=""
                    />
                </div>
        </div> */}
        </>
    )
}

