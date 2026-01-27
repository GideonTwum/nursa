import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex flex-col p-20 gap-20 items-center justify-center bg-green-900  aboutUs' id='about'>
        <div className='flex items-center gap-10'>
            <div className='flex flex-col gap-4'>
                <div>
                    <h1 className='text-white font-black text-5xl'>What is NUR<span className='text-yellow-500'>SA?</span></h1>
                </div>
                <div>
                    <p className='text-[#ccc] leading-loose'>Nursa stands for <span className='text-yellow-500'>Nursing and Midwifery students Association</span>. <br />
                    Nursa is the official student body that represents all nursing and <br /> midwidery students at Valley View University. The association <br /> serves as a unifying platform that promotes academic excellence, <br /> professional growth, and student welfare within the School of Nursing <br /> and Midwifery. We serve as a bridge between students and faculty <br /> ensuring every voice is heard while promoting excellence, compassion, <br /> and integrity in healthcare training.
                    </p>
                </div>
            </div>
            <div>
                <Image width={500} height={500} src="/images/nursa4.png" alt="about nursa image" className='rounded-lg' />

            </div>
        </div>

        <div className='mt-20 flex items-center gap-20'>
            <div>
                <Image
                width={250}
                height={250}
                src="/images/presido.png"
                alt = "Nursa President"
                className='rounded-lg'
                />
                <p className='text-2xl mt-2 text-white'> <span className='font-bold'>Jonathan</span> <br /> Nkansah Koranteng</p>
                <div className='h-[4px] w-[10vw] mt-2 bg-yellow-500'></div>
                <p className='italic mt-2 text-xl text-white'>President Of Nursa</p>
            </div>
            <div>
                <div className='flex items-center gap-2 '>
                    <div className='bg-white h-[2px] w-[4vw] '></div>
                    <p className='text-xl text-yellow-500'>Message from the President</p>
                </div>
                <div>
                    <p className='text-white font-bold text-2xl'>Welcome to Nursing and Midwifery Students <br /> Association (NURSA)</p>
                    <p className='text-[#ccc] leading-loose'>Welcome to the Nursing Students’ community. On behalf of the entire <br /> leadership and student body, I am delighted to have you here. Nursing <br /> is more than a course of study—it is a calling grounded in compassion,  <br /> discipline, and service to humanity.

                    As students, you are being shaped <br /> not only academically, but also ethically and professionally to meet the <br /> demands of the healthcare system. Our association is committed to <br /> supporting your academic journey, promoting unity, and creating opportunities <br /> for growth, leadership, and excellence.

                    I encourage you to stay engaged, <br /> support one another, and make the most of every opportunity available to you. <br /> Together, let us uphold the values of the nursing profession and strive for <br /> excellence in all we do.</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default About