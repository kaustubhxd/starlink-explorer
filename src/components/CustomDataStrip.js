import React from 'react'

const CustomDataStrip = ({ label, value, fontSize = '11px', fontWeight = 400, minWidth = '55px' }) => {
  return (
    <div className='flex gap-x-2 items-baseline '>
        <div
          className='text-[#C6C6C6] '
          style={{ fontSize, fontWeight, minWidth }}
        >{label}</div>
        <div className='poppins-500-11 text-white lg:w-max'
            style={{ fontSize, fontWeight }}
        >{value || '-'}</div>
    </div>
  )
}

export default CustomDataStrip
