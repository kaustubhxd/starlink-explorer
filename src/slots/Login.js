import React, { useContext, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { Button, ConfigProvider, Spin } from 'antd'
import CustomSpinner from '../components/CustomSpinner'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { client, setAuthHeader } from '../helpers/axiosClient'
import Tilt from 'react-parallax-tilt'
import useWindowSize from '../hooks/useWindowSize'
import { MyContext } from '../components/ContextProvider'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [attemptingLogin, setAttemptingLogin] = useState(false)
  const [incorrectPreviousAttempt, setIncorrectPreviousAttempt] = useState(false)

  const { updateAuthToken } = useContext(MyContext)

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
    onSubmit: (values, { resetForm }) => {
      const { username, password } = values
      tryLogin(username, password, resetForm)
    }
  })

  const tryLogin = (username, password, resetForm) => {
    setAttemptingLogin(true)
    setShowPassword(false)
    setIncorrectPreviousAttempt(false)

    if (!username?.length || !password?.length) return

    client.post('/auth/login', {
      username,
      password
    }).then(res => {
      const token = res?.data?.token
      if (token) {
        updateAuthToken(token)
        setAuthHeader(token)
      } else {
        throw new Error('Wrong username or password')
      }
    }).catch(e => {
      setIncorrectPreviousAttempt(true)
      resetForm()
    })
      .finally(() => {
        setAttemptingLogin(false)
      })
  }

  const { isMobile } = useWindowSize()

  return (
    <div className='flex flex-col lg:h-[unset] h-screen lg:w-full items-center justify-center text-white'>
        <CustomSpinner spinning={attemptingLogin}>
        <Tilt
            glareEnable={!isMobile}
            glareMaxOpacity={0.1}
            glareColor={'lightgreen'}
            glarePosition="all"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareBorderRadius='8px'
            tiltEnable={!isMobile}
        >
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
                <div className='mb-2'>Test Login: Username: stargazer | Password: 1234</div>

                  <div>
                      <CustomInput
                          name={'username'}
                          label={'Username'}
                          autoComplete={'off'}
                          placeholder={'Enter username'}
                          formikHook={formik}
                          {...formik.getFieldProps('username')}
                      />
                      <CustomInput
                          name={'password'}
                          className={'pt-2'}
                          label={'Password'}
                          type={showPassword ? undefined : 'password'}
                          autoComplete={'off'}
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
                      {incorrectPreviousAttempt && <div className='mt-2 poppins-400-13 text-[#FA7066]'>
                          Incorrect username or password
                      </div>}
                  </div>
              </div>
          </div>

        </Tilt>
        </CustomSpinner>
    </div>
  )
}

export default Login
