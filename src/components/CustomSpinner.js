import { ConfigProvider, Spin } from 'antd'
import React from 'react'

const CustomSpinner = ({spinning, children}) => {
  return (
    <ConfigProvider
        theme={{
            token: {
            colorPrimary: '#56ED5C',
            colorBgContainer: 'rgba(0,0,0,0.3)'
            },
        }}
    >
        <Spin spinning={spinning}>{children}</Spin>
    </ConfigProvider>
  )
}

export default CustomSpinner