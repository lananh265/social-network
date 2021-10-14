import React, {  useState } from 'react';
import axios from 'axios';

export default function Infor(){
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
        {file && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(file)} />
          <br />
          <button onClick={()=>setFile(null)}>Remove</button>
        </div>
        )}
		<form onSubmit={onSubmit}>
		  <div >
			<input
			  type='file'
			  id='customFile'
			  onChange={onChange}
			/>
		  </div>

		  <input
			type='submit'
			value='Upload'
		  />
		</form>
		<h3 >{uploadedFile.filePath}</h3>
	</div>
	);
}