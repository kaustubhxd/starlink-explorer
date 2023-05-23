import React, { useContext, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Button, ConfigProvider, Spin } from 'antd'
import { MyContext } from '../store/Context'
import CustomSpinner from '../components/CustomSpinner'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { setAuthState } = useContext(MyContext)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    isInitialValid: false,
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Please enter username')
        .typeError('Please enter username'),
      password: Yup.string()
        .required('Please enter password')
        .typeError('Please enter password')
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className='flex flex-col lg:h-[unset] h-screen lg:w-full items-center justify-center text-white'>
        <CustomSpinner spinning={false}>
            <div className='lg:bg-[rgba(20,25,32,0.6)] lg:w-[420px] p-9 lg:rounded-[20px]'>
                <div className='poppins-700-28 py-2.5'>
                <img src={require('../assets/starlink-explorer-text.svg').default} />
                </div>
                <div className='text-[#929292] flex flex-col gap-3 mt-6 poppins-400-14 text-justify'>
                    <div>
                        Explore the fascinating world of SpaceX Starlink satellites and their orbital data.
                        Our website allows you to discover real-time information about each Starlink satellite.
                    </div>
                    <div>
                        With our interactive 3D globe, you can visualize the exact locations of these satellites as they
                        orbit the Earth. Also filter by type, status and date range for historical analysis.
                    </div>
                </div>
                <div className='mt-10'>

                    <div>

                        <CustomInput
                            name={'username'}
                            label={'Username'}
                            autoComplete={false}
                            placeholder={'Enter username'}
                            formikHook={formik}
                            {...formik.getFieldProps('username')}
                        />
                        <CustomInput
                            name={'password'}
                            className={'pt-2'}
                            label={'Password'}
                            type={showPassword ? undefined : 'password'}
                            autoComplete={false}
                            placeholder={'Enter password'}
                            suffix={(
                                <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    <img src={require(!showPassword ? '../assets/eye_open.svg' : '../assets/eye_close.svg').default} />
                                </div>
                            )}
                            formikHook={formik}
                            {...formik.getFieldProps('password')}
                        />
                        <div className='w-full mt-7 opacity-40 border rounded-lg'
                            style={{
                              borderColor: formik.isValid ? 'rgba(86, 237, 92, 1)' : 'rgba(86, 237, 92, 0.4)',
                              opacity: formik.isValid ? 1 : 0.4
                            }}
                        >
                            <ConfigProvider
                                theme={{
                                  token: {
                                    colorText: '#56ED5C',
                                    colorPrimary: '#56ED5C',
                                    // colorBorder: formik.isValid ? 'rgba(86, 237, 92, 1)' : 'rgba(86, 237, 92, 0.4)',
                                    colorBorder: 'transparent',
                                    colorTextDisabled: '#56ED5C'
                                  }
                                }}
                            >
                                <Button
                                    type='submit'
                                    className='w-full h-10'
                                    style={{
                                      backgroundColor: 'rgba(86, 237, 92, 0.16)'
                                    }}
                                    onClick={() => formik.handleSubmit()}
                                >Login</Button>

                            </ConfigProvider>
                        </div>
                        {/* {formik.isValid.toString()} */}
                        {/* <div className='mt-2 poppins-400-13 text-[#FA7066]'>
                            Incorrect username or password
                        </div> */}
                    </div>
                </div>
            </div>
        </CustomSpinner>
    </div>
  )
}

export default Login
