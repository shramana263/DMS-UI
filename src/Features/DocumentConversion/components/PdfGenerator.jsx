import jsPDF from 'jspdf'
import React, { PureComponent, useEffect, useState } from 'react'
import DisplayArea from '../../Document/components/DisplayArea'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'


export default function PdfGenerator({ url }) {

    // const [selectedImages, setSelectedImages] = useState([]);

    const { setSelectedImages } = useDocumentContext()


    const handleCheckboxChange = () => {
        setSelectedImages(prev => {
            if (prev.includes(url)) {
                return prev.filter(item => item !== url);
            } else {
                return [...prev, url];
            }
        });
    };



    return (
        <>
            {/* <div className='relative '> */}
                <input type="checkbox" className='absolute top-3 right-3 h-6 w-6 border rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]'
                    onClick={() => handleCheckboxChange()} />
            {/* </div> */}
        </>
    )

}

