import jsPDF from 'jspdf'
import React, { PureComponent, useEffect, useState } from 'react'
import DisplayArea from '../../Document/components/DisplayArea'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'


export default function PdfGenerator({url}) {

    // const [selectedImages, setSelectedImages] = useState([]);

    const { setSelectedImages} = useDocumentContext()
    

    const handleCheckboxChange=()=>{
        // console.log("prev- ",selectedImages)
        setSelectedImages(prev=>[...prev,url])
        
    }

    
    return (
        <>
            <div className='relative rounded-full'>
                <input type="checkbox" className='absolute top-3 right-3 h-6 w-6'
                onClick={() => handleCheckboxChange()} />
            </div>
        </>
    )

}

