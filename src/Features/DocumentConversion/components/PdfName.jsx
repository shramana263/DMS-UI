import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useRef } from 'react'
import { RxCross2 } from "react-icons/rx";

const PdfName = ({ setName, selectedImages, setHandleCreatePdf, setNameForm }) => {

    const nameRef = useRef();
    const handleCreatePDF = () => {

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
                            pdf.save(`${nameRef.current.value}.pdf`)
                            setNameForm(false)
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

    };
    const handleClick = () => {
        setName(prev => nameRef.current.value)
        // setHandleCreatePdf(true)
        handleCreatePDF()
    }

    return (
        <>
            <div className='h-[100vh] w-full z-10 flex justify-center items-center fixed top-0 left-0 bg-slate-800/20 overflow-hidden'>
                <div className='fixed border rounded h-80 w-[600px] bg-white flex justify-center items-center flex-col gap-5 motion-preset-pop'>
                    <div className='flex justify-center items-center rounded-full p-5 absolute top-0 right-0 -mt-6 -me-6  bg-slate-900 text-white'
                        style={{ boxShadow: '#00000087 -5px 6px 14px 0px' }}
                        onClick={() => setNameForm(false)}
                    ><RxCross2 /></div>
                    <div className='relative w-full flex flex-col justify-center items-center gap-5'>

                        <input type="text" ref={nameRef} className='flex border h-12 w-80 focus:border-none p-2 ' placeholder='Example: myPdf (No need to give .pdf extension) ' />

                    </div>
                    <div className='flex gap-8'>

                        <div className=' hover:cursor-pointer border border-slate-600 bg-slate-600 text-white p-2 rounded-lg'
                            onClick={handleClick}
                        >Generate PDF</div>

                        <div className=' hover:cursor-pointer border border-red-800 bg-red-800 text-white p-2 rounded-lg'
                            onClick={() => setNameForm(false)}
                        >Cancel</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PdfName
