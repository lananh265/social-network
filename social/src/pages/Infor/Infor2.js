// import React, {  useState } from 'react';
// import axios from 'axios';

// export default function Infor(){
// 	const [file, setFile] = useState(null);
// 	const [filename, setFilename] = useState('Choose File');
// 	const [uploadedFile, setUploadedFile] = useState({});
	
// 	const tokenString = localStorage.getItem('token');
// 	const token = JSON.parse(tokenString);
  
// 	const onChange = e => {
// 	  setFile(e.target.files[0]);
// 	  setFilename(e.target.files[0].name);
// 	};
  
//     //gui file hinh len server
// 	const onSubmit = async e => {
// 	  e.preventDefault();
// 	  let newName = token.id+"avatar"+".jpg"
// 	  let id = token.id
// 	  const formData = new FormData();
// 	  formData.append('file', file);
// 	  formData.append('newName', newName);
// 	  formData.append('id', id);
// 	  console.log(newName)
  
// 	  try {
// 		const res = await axios.post('http://localhost:4000/upload', formData, {
// 		  headers: {
// 			'Content-Type': 'multipart/form-data'
// 		  },
// 		});
// 		const { fileName, filePath } = res.data;
// 		setUploadedFile({ fileName, filePath });
  
// 	  } catch (err) {
  
// 	   }
// 	};
  
// 	return (
// 	  <div>
//         {file && (
//         <div>
//           <img alt="not fount" width={"250px"} src={URL.createObjectURL(file)} />
//           <br />
//           <button onClick={()=>setFile(null)}>Remove</button>
//         </div>
//         )}
// 		<form onSubmit={onSubmit}>
// 		  <div >
// 			<input
// 			  type='file'
// 			  id='customFile'
// 			  onChange={onChange}
// 			/>
// 		  </div>

// 		  <input
// 			type='submit'
// 			value='Upload'
// 		  />
// 		</form>
// 		<h3 >{uploadedFile.filePath}</h3>
// 	</div>
// 	);
// }





import React, {  useState } from 'react';
import axios from 'axios';
import { StyledError, StyledForm, StyledFormWrapper, StyledInput, StyledButton } from '../../components/css/cssform';
import PostLogin from '../../API/postLogin';
import s from './Infor.module.css'

const obInfor = {
  name: "",
  email:"",
  pic:({}),
  password:"",
  confirmPassword:"",
  oldPassword:"",
  picMessage:({}),
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
    alert("C???p nh???t th??ng tin kh??ng th??nh c??ng. Vui l??ng ki???m tra l???i!")
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
            <h2><b>C???p Nh???t Th??ng Tin C?? Nh??n</b></h2>
            <br/><br/>
            <StyledInput
                placeholder="Nh???p h??? v?? t??n..."
                type="text"
                name="name"
                value={infor.name}
                onChange={inputInfor}
            />
            <br/>
            <StyledInput
                placeholder="Nh???p Email..."
                type="email"
                name="email"
                value={infor.email}
                onChange={inputInfor}
            /><br/>
            <StyledInput
                placeholder="Nh???p m???t kh???u m???i..."
                type="password"
                name="password"
                value={infor.password}
                onChange={inputInfor}
            /><br/>
            <StyledInput
                placeholder="X??c nh???n l???i m???t kh???u v???a nh???p..."
                type="password"
                name="confirmPassword"
                value={infor.confirmPassword}
                onChange={inputInfor}
            /><br/>
             <StyledInput
                placeholder="Nh???p m???t kh???u c??..."
                type="password"
                name="oldPassword"
                value={infor.oldPassword}
                onChange={inputInfor}
            /><br/>
            

             <label className={s.lbel} >C???p nh???t l???i h??nh ???nh</label>
             <br/>

              {file && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(file)} /><br/>
          <br />
          {/* <button  className={s.button} onClick={()=>setFile(null)}>Remove</button> */}

          <input className={s.inputfile} type='submit' />
          <label className="fa fa-refresh"  for="file">&ensp;T???i l???i</label>
		      <h3>{uploadedFile.filePath}</h3>
        </div>
        )}
		<form onSubmit={onSubmit}>
		  <div>
        <input type="file" name="file" id="file" onChange={onChange} className={s.inputfile} />
        <label className="fa fa-cloud-upload"  for="file">&ensp;T???i l??n</label>
		  </div>
    </form>
<br/>

            {error && (
              <StyledError>
                <p>{error}</p>
                </StyledError>
            )}
            <br/><br/>
            
            <StyledButton  type="submit">C???p Nh???t</StyledButton>
          </StyledForm>
        </StyledFormWrapper>
      
  </div>
  
  );
}