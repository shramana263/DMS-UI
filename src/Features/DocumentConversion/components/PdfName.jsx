import React, { useRef } from 'react'
import { RxCross2 } from "react-icons/rx";

const PdfName = ({ setName, setHandleCreatePdf, setNameForm }) => {

    const nameRef = useRef();
    const handleClick = () => {
        setName(nameRef.current.value)
        setHandleCreatePdf(true)
    }
    return (
        <>
            <div className='h-[100vh] w-full z-10 flex justify-center items-center fixed top-0 left-0 bg-slate-800/20 overflow-hidden'>
                <div className='fixed border rounded h-96 w-[600px] bg-white flex justify-center items-center flex-col gap-5'>
                    <div className='relative h-full w-full flex flex-col justify-center items-center gap-5'>
                        <div className='flex justify-center items-center rounded-full p-5 absolute top-0 right-0 -mt-6 -me-6  bg-slate-900 text-white'
                            style={{ boxShadow: '#00000087 -5px 6px 14px 0px' }}
                            onClick={() => setNameForm(false)}
                        ><RxCross2 /></div>

                        <input type="text" ref={nameRef} className='flex border h-12 w-80 focus:border-none p-2 ' placeholder='Example: myPdf (No need to give .pdf extension) ' />

                        <div className='flex gap-8'>

                            <div className=' hover:cursor-pointer border border-slate-600 bg-slate-600 text-white p-2 rounded-lg'
                                onClick={handleClick}
                            >Generate PDF</div>

                            <div className=' hover:cursor-pointer border border-red-800 bg-red-800 text-white p-2 rounded-lg'

                            >Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PdfName
