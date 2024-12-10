import React from 'react'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'
import SourceToCanvas from '../../DocumentConversion/components/SourceToCanvas'
import PdfGenerator from '../../DocumentConversion/components/PdfGenerator'
import ViewDocument from './ViewDocument'
import { useNavigate } from 'react-router-dom'


const icons = [
    {
        mime_type: "application/pdf",
        url: "https://www.science.co.il/internet/browsers/PDF-doc-256.png",
    },
    {
        mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        url: "https://static.vecteezy.com/system/resources/previews/036/897/160/non_2x/ms-word-office-file-icon-free-png.png",
    },
    {
        mime_type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        url: "https://www.freeiconspng.com/thumbs/ppt-icon/microsoft-powerpoint-icon-microsoft-powerpoint-2.png",
    },
    {
        mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        url: "https://image.similarpng.com/very-thumbnail/2021/09/Microsoft-Excel-icon-design-on-transparent-background-PNG.png"
    }

]
const DisplayArea = () => {
    const { files, isConversion } = useDocumentContext()
    const navigate = useNavigate()

    const handleClick = (url) => {
        console.log("Parent :", url)
        navigate("/viewdocument", { state: { url: url } })
    }
    return (
        <>
            <div className='gap-5 gallery'>
                {files && files.map((item, index) => (

                    <div className=' mb-5 overflow-hidden rounded  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300' key={index}>


                        {
                            ["image/jpeg", "image/png"].includes(item.mime_type) ?

                                <div className='relative'>
                                    {
                                        !isConversion &&
                                        <SourceToCanvas url={item.url} />
                                    }
                                    {
                                        isConversion &&
                                        <div className='absolute z-1 h-full w-full'>
                                            <PdfGenerator url={item.url} />
                                        </div>
                                    }
                                    <img src={item.url} alt="There is some problem with this image" />
                                </div>

                                :
                                <div>
                                    {icons && console.log('hello', icons.find((x)=> x.mime_type === item.mime_type))}

                                
                                    <img src={icons.find(x => x.mime_type == item.mime_type)?.url} alt="" className={`h-full w-full `} />

                                </div>

                        }

                        {/* <div className='border rounded flex justify-center items-center' onClick={() => handleClick(item.url)}>
                            Open PDF
                        </div> */}

                    </div>
                ))}
            </div>
        </>
    )
}

export default DisplayArea


