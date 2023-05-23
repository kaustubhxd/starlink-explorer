import React from 'react'
import Tilt from 'react-parallax-tilt'

const CustomTilt = ({ borderRadius, style, children, opacity = 0.2, glareEnable = true }) => {
  return (
    <Tilt
        glareEnable={glareEnable}
        glareMaxOpacity={opacity}
        glareColor="lightgreen"
        glarePosition="all"
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareBorderRadius={borderRadius}
        style={style}
    >
        {children}
    </Tilt>
  )
}

export default CustomTilt
