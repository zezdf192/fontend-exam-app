import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' 

function ButtonNotify({ children, descrip }) {
   

    return (
        <>
            <Tippy content={descrip} animation="scale" placement="bottom" arrow duration={0}>
                {children}
            </Tippy>
        </>
    )
}

export default ButtonNotify
