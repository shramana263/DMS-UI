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

    useEffect(()=>{
        // const handleCreatePDF = () => {

            const pdf = new jsPDF('p', 'pt');
            // const ctx = canvas.getContext('2d');
    
            var index = 0;
    
            selectedImages.forEach(async (url) => {
                await axios.get(`${url}`, { responseType: 'blob' })
                    .then((response) => {
    
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        // console.log("ctx:", ctx)
    
                        const image = new Image();
                        image.src = URL.createObjectURL(response.data);
                        // console.log(image.src)
                        image.onload = () => {
                            canvas.width = image.width;
                            canvas.height = image.height;
                            ctx.drawImage(image, 0, 0);
                            // const pdf = new jsPDF('p', 'pt');
                            // console.log(canvas.toDataURL('image/jpeg'))
                            // pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0);
    
    
    
                            // Calculate center coordinates
                            const pageWidth = pdf.internal.pageSize.getWidth();
                            const pageHeight = pdf.internal.pageSize.getHeight();
                            const imageWidth = image.width;
                            const imageHeight = image.height;
                            const marginX = 40; // Adjust the margin as needed
                            const marginY = 20; // Adjust the margin as needed
                            const scale = Math.min((pageWidth / imageWidth), (pageHeight / imageHeight));
    
                            // Calculate scaled dimensions
                            const scaledWidth = imageWidth * scale;
                            const scaledHeight = imageHeight * scale;
    
                            const x = (pageWidth - scaledWidth + marginX) / 2;
                            const y = (pageHeight - scaledHeight + marginY) / 2;
    
                            // pdf.addImage(canvas.toDataURL('image/jpeg '), 'JPEG', x, y, pageWidth - (margin * 5), pageHeight - (margin * 5));
                            //(pageWidth - scaledWidth) / 2
                            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', x, y, scaledWidth - marginX, scaledHeight - marginY);
    
    
                            // console.log(index, selectedImages.length)
                            index++;
                            if (index === selectedImages.length) {
                                console.log("inside if")
                                pdf.save(`${name}.pdf`)
                            }
                            else {
                                console.log("inside else")
                                pdf.addPage()
                            }
    
                        };
    
    
    
                    })
                    .catch((error) => {
                        console.log(error)
                    })
    
    
    
            });
            // console.log(pdf)
    
        // };
    },[isHandleCreatePdf])


    useEffect(() => {
        setConversion(true)
    }, [])
    return (
        <>
            {/* <DisplayDocument /> */}
            <div className='absolute hover:cursor-pointer top-[100px] right-10 z-50 border border-slate-600 bg-slate-600 text-white p-2 rounded-lg' onClick={handleName}>CREATE PDF</div>
            {
                isNameForm &&

                <PdfName setName={setName} setHandleCreatePdf={setHandleCreatePdf} setNameForm={setNameForm} />
            }
            
        </>
    )
}

export default MultiImageToPdf
