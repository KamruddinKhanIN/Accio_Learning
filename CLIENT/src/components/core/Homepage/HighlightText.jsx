import React from 'react'

const HighlightText = (props) => {


  return (
    <span className=' font-bold text-[#00FFFF]'>
        {props.text}
    </span>
  )
}

export default HighlightText