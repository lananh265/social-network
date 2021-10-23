import s from "./Body.module.css"
import Status2 from "../stastus2/Status2"

export default function Body({search}){
    
    return(
        <div className= {s.statusContainer}>
        <div className={s.sidebar}>
        {/* <h1>a</h1> */}
        </div>

        <div className= {s.status} >
            {/* <Share/> */}
            {/* <Feed /> */}
            <Status2 search={search}/>
            {/* <Status/> */}
            
        </div>

        <div className= {s.rightbar} >

        </div>
    </div>
    )
}