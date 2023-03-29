import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import {Button, Form, Stack} from 'react-bootstrap'
import { BsImageFill } from "react-icons/bs";
import { CrudContext } from '../context/CrudContext';
import { storage } from '../firebase-config';
import Alerts from './Alerts';
const Forms = () => {
  const {createUser,onlyUser,updateUser,getUsers} = useContext(CrudContext);
  const [file,setFile] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [gender,setGender] = useState('');
  const [img,setImg] = useState('');
  const [per,setper] = useState(null);
  const [message,setMessage] = useState({err:false,msg:'',variant:''});
   
  const initialState = () => {
    setName('');
    setEmail('');
    setGender('');
    setFile('');
    setImg('');
  }
  
  useEffect(() => {
    const uploadFile = () =>{
      const name = new Date().getTime()+file.name;
      const storageRef = ref(storage,name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setper(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImg(downloadURL);
          });
        }
      );
    }
    file && uploadFile();
  },[file])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await createUser({name:name,email:email,gender:gender,img:img});
      setMessage({err:false,msg:'Add successfully!!',variant:'success'})
      getUsers();
      initialState()
    } catch (error) {
      setMessage({err:true,msg:error.message,variant:'danger'})
    }
  }
  const handleEdit = async() => {
    const id = onlyUser?.id;
    try {
      await updateUser(id,{name:name,email:email,gender:gender,img:img});
      setMessage({err:false,msg:'Edit successfully!!',variant:'success'})
      getUsers();
      initialState();
    } catch (error) {
      setMessage({err:true,msg:error.message,variant:'danger'})
    }
  }
  useEffect(() => {
    setName(onlyUser?.name || '');
    setEmail(onlyUser?.email || '');
    setGender(onlyUser?.gender || '');
    setImg(onlyUser?.img || '');
  },[onlyUser])

  return (
    <>
    <div className='px-4 mt-2 w-50'>
    {message?.msg && <Alerts messageVariant={message.variant} setShow={setMessage}>{message.msg}</Alerts>}
      <h2>Form User</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Stack direction='horizontal' gap={4}>
              <Form.Label htmlFor='file' >Image here <BsImageFill className='iconImage'/></Form.Label>
              <Form.Control 
              type='file' 
              id='file'
              required
              style={{display:'none'}} 
              onChange={(e) => setFile(e.target.files[0])}/>
               {
                onlyUser !== null ? (
                  <img src={img} alt="" className='avatar' />
                ) : (
                  <img src={file 
                    ? URL.createObjectURL(file) 
                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    } 
                    alt="" 
                    className='avatar'
                    />
                )
               }
              </Stack>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control
                type='text'
                required
                value={name}
                placeholder='name user'
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              required
              value={email}
              placeholder='email user'
              onChange={(e) => setEmail(e.target.value)}
            />
            </Form.Group>
            <Form.Group className='mb-3'>
            <Form.Control
              required
              type='text'
              value={gender}
              placeholder='gender user'
              onChange={(e) => setGender(e.target.value)}
            />
            </Form.Group>
            <Stack direction='horizontal' gap={4}>
              <Button 
              variant='primary' 
              type='Submit' 
              disabled={onlyUser !== null}>
                Crear user
              </Button>
              {
                onlyUser && (
                  <Button 
                  variant='success' 
                  onClick={handleEdit}>
                    Edit user
                  </Button>
                )
              }
            </Stack>
        </Form>
        
    </div>
    </>
  )
}

export default Forms
