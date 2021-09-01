
import { Container } from "../components/footer/FooterStyles";
import React from "react";
import "./Gopy.css"

export default function Gopy(){
    return(
        <div>
        <div className="Header">
           <div className="trai">
               <h1>LANA.VN</h1>
           </div>
           <div className="phai">
           &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<button>Đăng Xuất</button>
               
           </div>
       </div>

        <div className = "gopy">
            <div className ="toanbo">
                <form >
                <div className="bang">
                    <table  border="1" cellSpacing="0">
                        <div className="nhaptt">
                    <thead>
                       <tr>
                           <td colSpan="2" ><h1>Nhập thông tin góp ý</h1></td>
                       </tr>
                   </thead>  
                        </div>

                   <div className="nodung">
                       
                       <tr>
                       <div className="tr">
                       <td><label><h2>Chủ đề</h2></label></td></div>
                      <div className="ph">
                       <td> 
                         <select name="slChuDe" id="slChuDe">
                         <option value="dichvu">Góp ý về dịch vụ </option>
                        <option value="website">Góp ý về website</option>
                        <option value="khac">Góp ý vấn đề khác</option>
                         </select>
                     </td></div>
                     </tr>
                     <tr className="form-group">
                         <td><label><h2>Họ tên:</h2> </label></td>
                         <td class="form-inline"><textarea class='ckeditor form-control' name="txtHoten" id="txtHoten" ></textarea>
      &nbsp;<font>*</font></td>
        
                     </tr><tr className="form-group">
                         <td><label><h2>Địa chỉ:</h2> </label></td>
                         <td class="form-inline"><textarea class='ckeditor form-control' name="txtDiachi" id="txtDiachi" ></textarea>
      &nbsp;<font>*</font></td>
                     </tr>
                     <tr className="form-group">
                         <td><label><h2>Số điện thoại:</h2> </label></td>
                         <td class="form-inline"><textarea class='ckeditor form-control' name="txtPhone" id="txtPhone" ></textarea>
      &nbsp;<font>*</font></td>
                     </tr>
                     <tr className="form-group">
                         <td><label><h2>Email:</h2> </label></td>
                         <td class="form-inline"><textarea class='ckeditor form-control' name="txtEmail" id="txtEmail" ></textarea>
      &nbsp;<font>*</font></td>
                     </tr>

                     <tr className="form-group">
    <td><label><h2>Nội dung:</h2></label></td>
    {/* <td><input type="text"  name="txtNoidung" id="txtNoidung" value=""></input></td> */}

    <td class="form-inline"><textarea class='ckeditor form-control' name="txtNoiDung" id="txtNoiDung" ></textarea>
      &nbsp;<font>*</font></td>
  
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td><input type="button" class="btn btn-primary" name="btnCapNhat" id="btnCapNhat" value="Cập nhật" style={{ color:"green", fontSize:"20px"}} ></input> &nbsp; &nbsp; &nbsp;
      <input type="reset" class='btn btn-warning' name="btnNhapLai" id="btnNhapLai" value="Nhập lại" style={{color:"red", fontSize:"20px"}}></input>
      
      </td>
  </tr>
                      
                   </div>

                    </table>
                </div>
                </form>
            </div>
        </div>
       </div>
    );
}