import React from 'react'
import { useModalContext } from '../contexts/ModalContext'
import { createPortal } from 'react-dom'
import { RxCross1 } from 'react-icons/rx'
import SourceToCanvas from '../../DocumentConversion/components/SourceToCanvas'
import { FiMinimize2 } from 'react-icons/fi'

const PreviewModal = ({ image }) => {
    const { isPreviewModalOpen, setPreviewModalOpen } = useModalContext()
    return createPortal(
        <>
            {
                isPreviewModalOpen &&
                <div className='flex justify-center flex-col items-center bg-slate-700/50 p-20 h-screen w-screen' onClick={() => setPreviewModalOpen(false)}>

                    <div className='h-[700px] w-[500px] flex flex-col gap-2 justify-center items-center bg-neutral-800 relative py-16 px-10 motion-preset-pop'>
                        <div className=' flex justify-end items-end w-[450px] h-[50px] z-10 absolute top-5 right-5'>
                            <div className=' text-gray-300 cursor-pointer bg-gray-800 text-2xl rounded-full p-3' onClick={() => setPreviewModalOpen(false)}><FiMinimize2 /></div>
                        </div>
                        <div className='flex justify-center items-center'>

                            <img src={image} alt="" className='object-scale-down'/>
                        </div>

                        <div className='absolute bottom-3 right-3'>

                            <SourceToCanvas url={image} />

                        </div>
                    </div>
                </div>
            }


        </>, document.getElementById('portal')
    )
}

export default PreviewModal

