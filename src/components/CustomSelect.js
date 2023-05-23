import { ConfigProvider, Select } from 'antd'
import React from 'react'

const CustomSelect = ({ disabled, placeholder, value, onChange, options, style, prefix, className }) => {
  return (
    <ConfigProvider
            theme={{
              token: {
                colorBgContainer: 'black',
                colorText: 'white',
                colorPrimary: '#56ED5C',
                colorBgElevated: 'black',
                colorPrimaryBg: 'rgba(94, 237, 86, 0.5)',
                colorTextBase: 'white'
              }
            }}
    >
        {/* <div className='border border-white rounded-md flex items-center cursor-pointer' onClick={() => setOpen(!open)}> */}
            {prefix || '' }
            <Select
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={onChange}
                options={options}
                style={style}
                className={className}
                // bordered={false}
            />
        {/* </div> */}
    </ConfigProvider>
  )
}

export default CustomSelect
