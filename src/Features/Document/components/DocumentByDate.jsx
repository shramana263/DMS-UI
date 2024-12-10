import React, { useRef, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import axiosClient from '../../../axios-client';
import { useDocumentContext } from '../../Auth/contexts/DocumentContext';
import DisplayArea from './DisplayArea';

const DocumentByDate = () => {
    const dateRef = useRef()
    // const [files, setFiles] = useState([])
    const { files, setFiles } = useDocumentContext()
    
    return (
        <>
            <DisplayArea/>

        </>
    )
}

export default DocumentByDate
