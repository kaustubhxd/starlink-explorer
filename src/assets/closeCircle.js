import React from 'react'

const CloseCircle = ({ color = '#4DD553' }) => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill='none' xmlns="http://www.w3.org/2000/svg">
        <path d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
            stroke={color} strokeWidth="1.25"/>
        <path d="M21.75 14.25L14.25 21.75M14.25 14.25L21.75 21.75" stroke={color} strokeWidth="1.25" strokeLinecap="round"/>
    </svg>

  )
}

export default CloseCircle
