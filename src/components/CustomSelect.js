import { ConfigProvider, Select } from 'antd'
import React from 'react'

const CustomSelect = ({disabled, value, onChange, options} ) => {
  return (
    <ConfigProvider
            theme={{
            token: {
                colorBgContainer: 'black',
                colorText: 'white',
                // colorPrimary: '#56ED5C',
                colorBgElevated:'black',
                colorPrimaryBg: 'rgba(94, 237, 86, 0.5)',
                colorTextBase: 'white',
            }
            }}
        >
            <Select
                disabled={disabled}
                value={value}
                onChange={onChange}
                options={options}
            />
        </ConfigProvider>
  )
}

export default CustomSelect