import styles from './gopy.module.css'


export default function Gopy(){

    return(
        <div className={styles.container}>

            <div className={styles.header}>
                <div className={styles.trai}>
                    <h1>LANA.VN</h1>
                </div>
                <div className={styles.phai}>
                    <button>Đăng Xuất</button>
                </div>
            </div>

            <div className={styles.gopy}>
                {/* <h1>Bảng góp ý </h1> <br/> */}
                <div className={styles.toanbo}>
                    <form>
                        <div className={styles.bang}>
                            <table border="1" cellSpacing="0">
                                <div className={styles.nhaptt}>
                                    <thead>
                                        <tr>
                                            <td colSpan="2" ><h1>Nhập thông tin góp ý</h1></td>
                                        </tr>
                                    </thead>
                                </div>
                                <div className={styles.nodung}>

                                </div>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}