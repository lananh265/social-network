import React, {  useState } from 'react';
import axios from 'axios';
import { StyledError, StyledForm, StyledFormWrapper, StyledInput, StyledButton } from '../../components/css/cssform';
import PostLogin from '../../API/postLogin';
import s from './Infor.module.css'
import PostInfor from '../../API/PostInfor';
const obInfor = {
  name: "",
  email:"",
  pic:({}),
  password:"",
  confirmPassword:"",
  oldPassword:"",
  picMessage:({}),
  newname:"",
  newemail:"",
  newpassword:"",
  newphone:"",
}
// const obChangeInfor={
  
//     username: "anh",
//     password: "123456",
//     newname:"Lan Anh Mới",
//     newemail: "",
//     newphone: ""

// }



const updateInfor = async(e)=>{
  e.preventDefault();
const json = await PostInfor(obInfor)
console.log(json)
}

export default function Infor(layToken){

  const [infor, setInfor] = useState(obInfor)
  const [error, setError]= useState('');
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
    setInfor (prev => ({ ...prev, [inputName]: value }));
}


	const [file, setFile] = useState(null);
	const [filename, setFilename] = useState('Choose File');
	const [uploadedFile, setUploadedFile] = useState({});
	
	const tokenString = localStorage.getItem('token');
	const token = JSON.parse(tokenString);
  
	const onChange = e => {
	  setFile(e.target.files[0]);
	  setFilename(e.target.files[0].name);
	};

  const onClick = async(e) =>{
    e.preventDefault();
    
      const ob = {
          username: obInfor.username,
          password: obInfor.password,
          newemail: obInfor.newemail,
          newphone: obInfor.newphone,
          newname: obInfor.newname,
          newpassword: obInfor.newpassword,
      }
      const json = await setInfor(ob)
    }
  
    //gui file hinh len server
	const onSubmit = async e => {
	  e.preventDefault();
	  let newName = token.id+"avatar"+".jpg"
	  let id = token.id
	  const formData = new FormData();
	  formData.append('file', file);
	  formData.append('newName', newName);
	  formData.append('id', id);
	  console.log(newName)
  
	  try {
		const res = await axios.post('http://localhost:4000/upload', formData, {
		  headers: {
			'Content-Type': 'multipart/form-data'
		  },
		});
		const { fileName, filePath } = res.data;
		setUploadedFile({ fileName, filePath });
  
	  } catch (err) {
  
	   }
	};

	return (
	  <div>
        <StyledFormWrapper>
          <StyledForm onSubmit={handleInfor}>
            <h2><b>Cập Nhật Thông Tin Cá Nhân</b></h2>
            <br/><br/>
            <StyledInput
                placeholder="Nhập họ và tên..."
                type="text"
                name="name"
                value={infor.name}
                onChange={inputInfor}
            />
            <br/>
            <StyledInput
                placeholder="Nhập Email..."
                type="email"
                name="email"
                value={infor.email}
                onChange={inputInfor}
            /><br/>
            <StyledInput
                placeholder="Nhập mật khẩu mới..."
                type="password"
                name="password"
                value={infor.password}
                onChange={inputInfor}
            /><br/>
            <StyledInput
                placeholder="Xác nhận lại mật khẩu vừa nhập..."
                type="password"
                name="confirmPassword"
                value={infor.confirmPassword}
                onChange={inputInfor}
            /><br/>
             <StyledInput
                placeholder="Nhập mật khẩu cũ..."
                type="password"
                name="oldPassword"
                value={infor.oldPassword}
                onChange={inputInfor}
            /><br/>
            

             <label className={s.lbel} >Cập nhật lại hình ảnh</label>
             <br/>

               {file && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(file)} /><br/>
          <br />
          
          
          <button  className={s.button} onClick={()=>setFile(null)}>Remove</button>

          {/* <input className={s.inputfile} type='submit' />
          <label className="fa fa-refresh"  for="file">&ensp;Tải lại</label>
		      <h3>{uploadedFile.filePath}</h3> */}
        </div>
        )}
        <div>
          	  
            <label className="fa fa-cloud-upload" >&ensp;Tải lên
            <input type="file" name="file" id="file" onChange={onChange} className={s.inputfile}/>
            </label>
          
		   </div>

      {/* <div>
        <form>	  
          <label className="fa fa-cloud-upload"  for="file">&ensp;Tải lên</label>
          <input type="file" name="file" id="file" onChange={onChange} className={s.inputfile} />
        </form>
		  </div> */}
    
    {/* <form>
		  <div> */}
      {/* <label className="fa fa-cloud-upload"  for="file">&ensp;Tải lên</label> */}
        {/* <input type="file" name="file" id="file" onChange={onChange} className={s.inputfile} /> */}
		  {/* </div>
    </form> */}

<br/> 

            {error && (
              <StyledError>
                <p>{error}</p>
                </StyledError>
            )}
            <br/><br/> 
            
            <StyledButton  type="submit">Cập Nhật</StyledButton>
          </StyledForm>
        </StyledFormWrapper>

       <button onClick={(e)=>{updateInfor(e)}}>thay doi thong tin user</button>
      
   </div>
  
  );
}