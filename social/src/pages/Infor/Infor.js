import React, {  useState } from 'react';
// import axios from 'axios';
import { StyledError, StyledForm, StyledFormWrapper, StyledInput, StyledButton } from '../../components/css/cssform';
import s from './Infor.module.css'
import PostInfor from '../../API/PostInfor';
import PostLogin from '../../API/postLogin'

export default function Infor(layToken){

  const [infor] = useState({name: ""})
  const [error, setError]= useState('');
  const [input, setInput] = useState({
    username: "",
    password: "",
    newname:"",
    newemail: "",
    newphone: "",
    newpassword:"",
    confirmPassword:"",
  })

  const changeInfor=async(e)=>{
    e.preventDefault()
    //console.log(input)
    const json = await PostInfor(input)
    console.log(json)
  }
  const handleInfor =  async e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(infor);

    for (let key in infor) {
      if (infor[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');
    const ob = {
        username: infor.name,
        password: infor.password
    }
   let json = await PostLogin(ob)
   console.log(json)

    layToken(json)
   if(!json.status){
    alert("Cập nhật thông tin không thành công. Vui lòng kiểm tra lại!")
  }else{
    window.location.href = "/";
  }
};
  const inputInfor =(e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setInput (prev => ({ ...prev, [inputName]: value }));
}


	const [file, setFile] = useState(null);
	const [ filename, setFilename] = useState('Choose File');
	const [ setUploadedFile] = useState({});
	
	const tokenString = localStorage.getItem('token');
	const token = JSON.parse(tokenString);
  
	const onChange = e => {
	  setFile(e.target.files[0]);
	  setFilename(e.target.files[0].name);
	};

 
  
    //gui file hinh len server



const postImage = async e =>{
  e.preventDefault();
	  let newName = token.id+"avatar"+".jpg"
	  let id = token.id
	  const formData = new FormData();
	  formData.append('file', file);
	  formData.append('newName', newName);
	  formData.append('id', id);

    const url = "http://localhost:4000/upload"
    fetch(url, {
      method: "POST",
      body: formData
    })
    .then(data=>data.json())
    .then(dataJson=>{
      console.log(dataJson)
      const { fileName, filePath } = dataJson;
		  setUploadedFile({ fileName, filePath });
     
    })
    .catch(err=>console.log(err))
}
  

const updateInfor = async(e)=>{
  e.preventDefault();
const json = await PostInfor()
console.log()
}
	return (
	  <div>
        <StyledFormWrapper>
          <StyledForm>
            <h2><b>Cập Nhật Thông Tin Cá Nhân</b></h2><hr/>
            <br/><br/>
             <StyledInput
            placeholder="Nhập tên người dùng mới..."
            type="text"
            name="newname"
            value={input.newname}
            onChange={inputInfor}
        /><br/>

            <StyledInput
                placeholder="Nhập mật khẩu mới..."
                type="password"
                name="newpassword"
                value={input.newpassword}
                onChange={inputInfor}
            /><br/>
          
              <StyledInput
            placeholder="Nhập số điện thoại mới..."
            type="number"
            name="newphone"
            value={input.newphone}
            onChange={inputInfor}
        /><br/>
           
         <StyledInput
                placeholder="Nhập Email mới..."
                type="email"
                name="newemail"
                value={input.newemail}
                onChange={inputInfor}
            /><br/>
         <StyledInput
                placeholder="Nhập tài khoản hiện tại ..."
                type="text"
                name="username"
                value={input.username}
                onChange={inputInfor}
            />
            <br/>
            <StyledInput
                placeholder="Nhập mật khẩu hiện tại..."
                type="password"
                name="password"
                value={input.password}
                onChange={inputInfor}
            />
          

            {error && (
              <StyledError>
                <p>{error}</p>
                </StyledError>
            )}
            <br/>
            
            <button className={`${s.butt}`}  onClick={changeInfor}>Cập Nhật Thông Tin Cá Nhân</button>
            <br/><br/>
            
            <label className={s.lbel} >Cập nhật lại hình ảnh: <i>(Chọn ảnh để tải lên)</i></label>
             <br/>

               {file && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(file)} /><br/>
          <br />
          
          
          <button  className={s.button} onClick={()=>setFile(null)}>Remove</button>
        </div>
        )}
        <div>
          	  
            <label className="fa fa-cloud-upload" >&ensp;Tải lên
            <input type="file" name="file" id="file" onChange={onChange} className={s.inputfile}/>
            </label>
            <br/><br/>
            <button className={`${s.butt}`} onClick={postImage}>Cập Nhật Hình Ảnh</button>
		   </div>

          </StyledForm>
        </StyledFormWrapper>

       {/* <button onClick={(e)=>{updateInfor(e)}}>thay doi thong tin user</button> */}
      {/* <button onClick={changeInfor}>Thay Doi</button> */}
   </div>
  
  );
}