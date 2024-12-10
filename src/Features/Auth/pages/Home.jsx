import React from 'react'
import AllDocuments from '../../Document/components/AllDocuments'
import { useNavigate } from 'react-router-dom'

// import AddDocument from '../components/AddDocument'



const Home = () => {

  const navigate= useNavigate()
  const handleClick=()=>{
    navigate('/upload-document')
  }
  const getAllDocs=()=>{
    navigate('/all-document')
  }

  return (
    <>
    <div className='flex justify-center items-center h-full w-full mt-10 flex-col gap-5'>
      <div className='font-bold text-3xl'>

        Welcome to home
      </div>
      <div className='border-2 border-gray-900 bg-gray-900 text-white hover:cursor-pointer rounded p-3' onClick={getAllDocs}>
        All Documents
      </div>
      <div className='border-2 border-gray-900 bg-gray-900 text-white hover:cursor-pointer rounded p-3' onClick={handleClick}>
        Add New Document
      </div>

      
    </div>
    </>
  )
}

export default Home
