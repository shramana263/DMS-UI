import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import '../../../css/image.css'
import DisplayDocument from './DisplayDocument'
import DocumentByDate from './DocumentByDate'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'
import DocumentFilter from './DocumentFilter'
import { Link, useNavigate } from 'react-router-dom'


const AllDocuments = () => {

    const navigate = useNavigate()
    // const handleClick = () => {
    //     navigate('/to-pdf')
    // }

    return (
        <>
            <div className='w-full flex justify-between items-center dark:text-fuchsia-50'>

                <div className='flex justify-left items-center font-bold text-3xl mt-5' >
                    Your documents
                </div>
                
            </div>

            <DocumentFilter />


            <DisplayDocument />




        </>
    )
}

export default AllDocuments
