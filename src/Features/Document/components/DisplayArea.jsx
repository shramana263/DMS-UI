import React, { useEffect, useState } from 'react'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'
import SourceToCanvas from '../../DocumentConversion/components/SourceToCanvas'
import PdfGenerator from '../../DocumentConversion/components/PdfGenerator'
import ViewDocument from './ViewDocument'
import { useNavigate } from 'react-router-dom'
import { useModalContext } from '../contexts/ModalContext'
import PreviewModal from '../modal/PreviewModal'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


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
        mime_type: "application/msword",
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
    const { files, isConversion, selectedImages, setSelectedImages } = useDocumentContext()
    const navigate = useNavigate()
    const { setPreviewModalOpen } = useModalContext()
    const [image, setImage] = useState(null)

    const handleClick = (url) => {
        console.log("Parent :", url)
        navigate("/viewdocument", { state: { url: url } })
    }
    const handleViewImage = (url) => {
        setImage(url)
        setPreviewModalOpen(true)
    }
    const isEmpty = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
    useEffect(() => {
        console.log("selected images: ", selectedImages)
    }, [selectedImages])

    return (
        <>
            {
                isEmpty(selectedImages) ?
                    <div className='font-bold flex justify-self-end items-center border-4 border-purple-800 rounded-lg text-purple-800 dark:border-purple-500 dark:text-purple-500 p-2'
                    // onClick=}
                    >
                        + New PDF
                    </div>
                    :
                    <div className='font-bold flex justify-self-end items-center border-4 border-purple-800 rounded-lg text-purple-800 dark:border-purple-500 dark:text-purple-500 p-2'
                    // onClick=}
                    >
                        Create
                    </div>


            }
            <div className='gap-3 grid grid-cols-8 mt-5'>
                {files ? files.map((item, index) => (

                    <div className='flex mb-5 overflow-hidden rounded  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300' key={index}>
                        {/* {console.log(item)} */}

                        {
                            ["image/jpeg", "image/png"].includes(item.mime_type) ?
                                <div className='flex flex-col items-center motion-preset-pop'>
                                    <div className='relative h-40 w-40 group'>
                                        {
                                            // isConversion &&
                                            <div className='absolute top-0 right-0 z-50 invisible group-hover:visible'>
                                                <PdfGenerator url={item.url} />
                                            </div>
                                        }
                                        <img src={item.url} alt="There is some problem with this image" onClick={() => handleViewImage(item.url)} className='h-full w-full' />

                                    </div>
                                    <div className='text-sm dark:text-fuchsia-50'>{item.original_name}</div>
                                    <PreviewModal image={image} />
                                </div>

                                :
                                <div className='h-40 w-40'>
                                    {/* {icons && console.log('hello', icons.find((x)=> x.mime_type === item.mime_type))} */}


                                    <img src={icons.find(x => x.mime_type == item.mime_type)?.url} alt="hello" className={`h-full w-full `} />
                                    <div className='text-sm dark:text-fuchsia-50'>{item.original_name}</div>
                                </div>

                        }

                        {/* <div className='border rounded flex justify-center items-center' onClick={() => handleClick(item.url)}>
                            Open PDF
                        </div>  */}

                    </div>
                ))
                    :
                    <div className='h-screen w-screen flex justify-center items-center'>
                        <AiOutlineLoading3Quarters size={40} className='motion-preset-spin' />
                    </div>

                }
            </div>
        </>
    )
}

export default DisplayArea


