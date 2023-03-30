import { async } from '@firebase/util'
import React, { useContext } from 'react'
import { Button, Stack, Table } from 'react-bootstrap'
import { BsImageFill, BsPenFill, BsTrash } from "react-icons/bs";
import { CrudContext } from '../context/CrudContext'
  const tableHead = {
    id:'#id',
    avatarImg: 'Avatar',
    name:'Name',
    email: 'Email',
    gender: 'Gender',
    action: 'Action',
  }
const Tables = () => {
  const {users,deleteUser,fijarUser,getUsers} = useContext(CrudContext);
  const handleDelete = async(id) => {
    try {
      await deleteUser(id);
      getUsers();
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async(id) => {
    try {
      await fijarUser(id)
    } catch (error) {
      console.log(error);
    }
  }
  
  const headRow = () => {
    return Object.values(tableHead).map((title,index) => (
        <td key={index} className='p-2'>{title}</td>
    ))}

  return (
    <div className='px-4 table'>
      <Table>
        <thead>
          <tr className='p-2'>{headRow()}</tr>
        </thead>
        <tbody>
          {users && users.map((user,index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.img ? 
              <img src={user.img} alt="" className='avatar'/> 
              : 'Not avatar'}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>
                <Stack direction='horizontal' gap={2}>
                  <Button variant='primary' id={user.id} onClick={(e) => handleUpdate(e.target.id)}><BsPenFill/></Button>
                  <Button variant='danger' id={user.id} onClick={(e) => handleDelete(e.target.id)}><BsTrash/></Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Tables
