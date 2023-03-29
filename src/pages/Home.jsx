import React from 'react'
import { Stack } from 'react-bootstrap'
import Forms from '../components/Forms'
import Tables from '../components/Tables'

const Home = () => {
  
  
  return (
    <>
     <div>
        <h2 className='text-center mt-1' >CRUD APP WITH FIREBASE</h2>
        <div className='mt-4'>
            <Stack direction='horizontal' gap={1}>
                <Tables/>
                <Forms/>
            </Stack> 
        </div>
     </div>
    </>
  )
  }

export default Home
