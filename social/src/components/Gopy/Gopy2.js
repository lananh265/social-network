import React from 'react';
import styles from './gopy.module.css';
import Footer from '../footer/Footer';

export default function Gopy(){

    return(
        <div>
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
                                    <tr>
                                        <td><h4>Câu hỏi của bạn liên quan đến: &nbsp;&nbsp;</h4></td>
                                        <td>
                                            
                                        <select name="slChuDe" id="slChuDe">
                                        <option value="dichvu">Vấn đề ... </option>
                                        <option value="dichvu">Dịch vụ </option>
                                        <option value="nguoihotro">Người hỗ trợ</option>
                                        <option value="khac">Góp ý khác</option>
                                        </select>
                                        
                                        </td>
                                    </tr>
                                    <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
                                    

                                    <tr>
                                        <td ><h4>Nội dung góp ý về vấn đề:</h4></td>
                                        <td ><textarea rows="4" cols="75" placeholder="Đây là vùng nhập nội dung ..."></textarea></td>

                                        {/* <td><input class="form-control col-sm-8" name="txtNoiDung" id="txtNoiDung"/>
                                        &nbsp;<font>*</font></td> */}

                                    </tr>
                                    <tr>
                                    
                                    <td>
                                     {/* <td><input type="button" class="btn btn-primary" name="btnCapNhat" id="btnCapNhat" value="Cập nhật" style={{ color:"green", fontSize:"20px"}} ></input> &nbsp; &nbsp; &nbsp;
                                     <input type="reset" class='btn btn-warning' name="btnNhapLai" id="btnNhapLai" value="Nhập lại" style={{color:"red", fontSize:"20px"}}></input> */}
                                    <button type="submit" class="btn btn-success">Cập Nhật</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-danger">Nhập Lại</button>
                                    </td>
                                     </tr>

                                </div>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        <Footer />
    </div>
       
    )
}
