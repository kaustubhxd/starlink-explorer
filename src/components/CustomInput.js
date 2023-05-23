import { ConfigProvider, Input } from 'antd'
import React from 'react'

const CustomInput = ({
  label, placeholder, value, className,
  type, autoComplete, suffix, name,
  formikHook: formik, error, errorText, showError, onChange
}) => {
  if (formik && name) {
    showError = showError || (formik.touched[name] && !!formik.errors[name])
    errorText = errorText || (formik.touched[name] && formik.errors[name])
  }

  return (
    <div className={className}>
        <div className='poppins-400-12 mb-2 text-white'>{label}</div>
        <div className='border border-[#EBEBEB] rounded-lg py-2 text-white flex pr-4 h-10 items-center pl-2'>
            <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: 'white',
                    colorTextPlaceholder: 'gray',
                    colorText: 'white',
                    colorBgBase: 'transparent'
                  }
                }}
            >
                <Input
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    bordered={false}
                    type={type}
                    autoComplete={autoComplete}
                />
            </ConfigProvider>
            <div>
                {suffix}
            </div>
        </div>
        <div className='text-[#FA7066] mt-1 h-5'>
          {showError && <div>{errorText}</div>}
        </div>
    </div>
  )
}

export default CustomInput
