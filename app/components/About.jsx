import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex flex-col px-6 py-12 md:p-20 gap-12 md:gap-20 items-center justify-center bg-green-900 aboutUs' id='about'>
        <div className='flex flex-col lg:flex-row items-center gap-8 md:gap-10 max-w-6xl'>
            <div className='flex flex-col gap-4 text-center lg:text-left'>
                <div>
                    <h1 className='text-white font-black text-3xl md:text-4xl lg:text-5xl'>What is NUR<span className='text-yellow-500'>SA?</span></h1>
                </div>
                <div>
                    <p className='text-[#ccc] leading-loose text-sm md:text-base'>
                        Nursa stands for <span className='text-yellow-500'>Nursing and Midwifery students Association</span>. 
                        Nursa is the official student body that represents all nursing and midwidery students at Valley View University. The association serves as a unifying platform that promotes academic excellence, professional growth, and student welfare within the School of Nursing and Midwifery. We serve as a bridge between students and faculty ensuring every voice is heard while promoting excellence, compassion, and integrity in healthcare training.
                    </p>
                </div>
            </div>
            <div className='flex-shrink-0'>
                <Image 
                    width={500} 
                    height={500} 
                    src="/images/nursa4.png" 
                    alt="about nursa image" 
                    className='rounded-lg w-[280px] h-auto md:w-[400px] lg:w-[500px]' 
                />
            </div>
        </div>

        <div className='mt-8 md:mt-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 max-w-6xl'>
            <div className='text-center lg:text-left'>
                <Image
                    width={250}
                    height={250}
                    src="/images/presido.png"
                    alt="Nursa President"
                    className='rounded-lg mx-auto lg:mx-0 w-[180px] h-auto md:w-[250px]'
                />
                <p className='text-xl md:text-2xl mt-2 text-white'>
                    <span className='font-bold'>Jonathan</span> <br /> Nkansah Koranteng
                </p>
                <div className='h-[4px] w-24 md:w-32 mt-2 bg-yellow-500 mx-auto lg:mx-0'></div>
                <p className='italic mt-2 text-lg md:text-xl text-white'>President Of Nursa</p>
            </div>
            <div className='text-center lg:text-left'>
                <div className='flex items-center gap-2 justify-center lg:justify-start'>
                    <div className='bg-white h-[2px] w-8 md:w-12'></div>
                    <p className='text-lg md:text-xl text-yellow-500'>Message from the President</p>
                </div>
                <div className='mt-4'>
                    <p className='text-white font-bold text-xl md:text-2xl mb-4'>
                        Welcome to Nursing and Midwifery Students Association (NURSA)
                    </p>
                    <p className='text-[#ccc] leading-loose text-sm md:text-base'>
                        Welcome to the Nursing Students' community. On behalf of the entire leadership and student body, I am delighted to have you here. Nursing is more than a course of study—it is a calling grounded in compassion, discipline, and service to humanity.
                        <br /><br />
                        As students, you are being shaped not only academically, but also ethically and professionally to meet the demands of the healthcare system. Our association is committed to supporting your academic journey, promoting unity, and creating opportunities for growth, leadership, and excellence.
                        <br /><br />
                        I encourage you to stay engaged, support one another, and make the most of every opportunity available to you. Together, let us uphold the values of the nursing profession and strive for excellence in all we do.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
