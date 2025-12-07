import { Carousel } from 'antd'
import React from 'react'
const contentStyle = {
     width: '100%',
        maxWidth: '1200px', // controls max carousel width
        height: '100%',     // fill the parent (Splash's h-[60vh])
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
}
const SlideShow = () => {
  return (
    <>    
        <Carousel arrows infinite={false}>
            <div>
                <img src="/image/nursa1.png" alt="a picture of nursing students" className='object-cover w-full' />
            </div>
        </Carousel>
    </>
  )
}

export default SlideShow