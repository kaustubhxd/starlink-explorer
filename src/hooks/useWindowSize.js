import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  function handleWindowSizeChange () {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 1024

  return { width, isMobile }
}

export default useWindowSize
