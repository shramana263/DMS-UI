import React, { useEffect, useState } from 'react'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'
import DisplayDocument from '../../Document/components/DisplayDocument'
import jsPDF from 'jspdf'
import axios from 'axios'
import PdfName from '../components/PdfName'

const MultiImageToPdf = () => {

    const { setConversion, selectedImages } = useDocumentContext()
    const [isNameForm, setNameForm]= useState(false)
    const [name, setName]= useState('')
    const [isHandleCreatePdf, setHandleCreatePdf]= useState(false)

    const handleName=()=>{
        setNameForm(true)

    }

    // useEffect(()=>{
        
    // },[isHandleCreatePdf])


    useEffect(() => {
        setConversion(true)
    }, [])
    return (
        <>
            {/* <DisplayDocument /> */}
            <div className='font-bold flex justify-self-end items-center border-4 border-purple-800 rounded-lg text-purple-800 dark:border-purple-500 dark:text-purple-500 p-2 hover:cursor-pointer' onClick={handleName}>CREATE PDF</div>
            {
                isNameForm &&

                <PdfName setName={setName} selectedImages={selectedImages}  setHandleCreatePdf={setHandleCreatePdf} setNameForm={setNameForm} />
            }
            
        </> 
    )
}

export default MultiImageToPdf
