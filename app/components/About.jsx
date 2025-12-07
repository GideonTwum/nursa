import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center bg-green-900  aboutUs'>
        <div className='flex items-center gap-10'>
            <div className='flex flex-col gap-4'>
                <div>
                    <h1 className='text-white font-black text-5xl'>What is NUR<span className='text-yellow-500'>SA?</span></h1>
                </div>
                <div>
                    <p className='text-white leading-loose'>Nursa stands for <span className='text-yellow-500'>Nursing and Midwifery students Association</span>. <br />
                    Nursa is the official student body that represents all nursing and <br /> midwidery students at Valley View University. The association <br /> serves as a unifying platform that promotes academic excellence, <br /> professional growth, and student welfare within the School of Nursing <br /> and Midwifery. We serve as a bridge between students and faculty <br /> ensuring every voice is heard while promoting excellence, compassion, <br /> and integrity in healthcare training.
                    </p>
                </div>
            </div>
            <div>
                <Image width={500} height={500} src="/images/nursa4.png" alt="about nursa image" className='rounded-lg' />

            </div>
        </div>

        {/* Executive */}
        
        {/* <div>    
            <div className=''>
                <h1>hi</h1>
            </div>
        </div> */}
        
    </div>
  )
}

export default About