import { GlobalStyle } from "../css/cssform";
import s from"./header2.module.css"

export default function Header(){
    return(
        <div>
            <GlobalStyle />
            <div className={s.header}>
                <div className={`${s.left} ${s.box}`}>
                    <button>Dang nhap</button>
                </div>
                <div className={`${s.right} ${s.box}`}>
                <button>Dang ki</button>

            </div>
        </div>
        </div>
    )

}