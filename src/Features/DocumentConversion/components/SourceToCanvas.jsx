import axios from 'axios'
import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react'

function blobToBase64(blob) {
    // console.log(blob)
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);

        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(blob);

    });
}

const SourceToCanvas = ({ url }) => {
    const canvasRef = useRef()

    // const [data, setData]= useState(null)
    // const imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyruWF6po28qX8CGn6yzOqNgvgxzPkF5Nplw&s'

    const handleClick = async () => {
        await axios.get(`${url}`, { responseType: 'blob' })
            .then((response) => {
                // console.log(response.data)
                // console.log() 
                // const base64Data = blobToBase64(response.data)
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
                    const pdf = new jsPDF('p', 'pt');

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
                    
                    const x = (pageWidth - scaledWidth+marginX) / 2 ;
                    const y = (pageHeight - scaledHeight+marginY) / 2 ;

                    // pdf.addImage(canvas.toDataURL('image/jpeg '), 'JPEG', x, y, pageWidth - (margin * 5), pageHeight - (margin * 5));
                    //(pageWidth - scaledWidth) / 2
                    pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', x, y, scaledWidth-marginX, scaledHeight-marginY);
                    
                    pdf.save('image.pdf');
                };

            })
            .catch((error) => {
                console.log(error)
            })

    }




    return (
        <>
            <div onClick={handleClick} className='flex justify-center items-center rounded p-2 bg-slate-600 text-slate-50 hover:cursor-pointer'>
                export as pdf
                <canvas className='h-44 w-44 hidden' ref={canvasRef}>

                </canvas>
                {/* {data} */}
            </div>
        </>
    )
}

export default SourceToCanvas



