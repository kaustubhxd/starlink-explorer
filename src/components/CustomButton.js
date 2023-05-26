import { Button, ConfigProvider } from 'antd'
import React from 'react'

const CustomButton = ({ style, disabled, className, onClick, children, height = '40px', primary = false }) => {
  const color = primary
    ? {
        borderColorDisabled: 'rgba(86, 237, 92, 0.4)',
        borderColor: 'rgba(86, 237, 92, 1)',
        backgroundColor: 'rgba(86, 237, 92, 0.16)'
      }
    : {
        borderColorDisabled: 'rgb(192,192,192,0.4)',
        borderColor: 'rgb(192,192,192,1)',
        backgroundColor: 'rgba(192,192,192, 0.16)'
      }

  return (
    <div className={className}>
        <div className='w-full border rounded-lg'
            style={{
              borderColor: disabled ? color.borderColorDisabled : color.borderColor,
              opacity: disabled ? 0.4 : 1,
              ...style
            }}
        >
            <ConfigProvider
                theme={{
                  token: {
                    colorText: primary ? '#56ED5C' : 'white',
                    colorPrimary: '#56ED5C',
                    // colorBorder: formik.isValid ? 'rgba(86, 237, 92, 1)' : 'rgba(86, 237, 92, 0.4)',
                    colorBorder: 'transparent',
                    colorTextDisabled: '#56ED5C'
                  }
                }}
            >
                <Button
                    type='submit'
                    className='w-full'
                    style={{
                      backgroundColor: color.backgroundColor,
                      height
                    }}
                    onClick={onClick}
                >{children}</Button>

            </ConfigProvider>
        </div>
    </div>
  )
}

export default CustomButton
