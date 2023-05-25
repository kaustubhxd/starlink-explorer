import './index.css'
import { CustomGlobe } from './components/CustomGlobe'
import React, { useContext } from 'react'
import './helpers/fontStyles.css'
import CustomToggle from './components/CustomToggle'
import { DownOutlined } from '@ant-design/icons'
import SatList from './slots/SatList'
import Login from './slots/Login'
import useWindowSize from './hooks/useWindowSize'
import { MyContext } from './components/ContextProvider'
import SatInfoModal from './components/SatInfoModal'

function App () {
  const {
    authToken,
    satInfoModal
  } = useContext(MyContext)

  const { isMobile } = useWindowSize()

  return (
      <div className="App relative lg:overflow-hidden">
            <div className='lg:h-screen flex flex-col lg:flex-row bg-transparent' style={{ backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)' }}>
              { (!isMobile || (isMobile && authToken))
                ? <div className='flex flex-col bg-transparent h-screen relative'>
                {<div className='mt-[40px] flex items-center justify-center cursor-grab'>
                  <CustomToggle
                    options={[
                      { id: 3, label: 'Simple' },
                      { id: 1, label: 'Detailed' }
                    ]}
                  />
                </div>}
                <div>
                  <CustomGlobe />
                </div>
                <div className='absolute bottom-20 right-6 rounded-full border cursor-pointer
                  border-white h-10 w-10 flex items-center justify-center lg:hidden'
                    onClick={() => {
                      const element = document.querySelector('#list-parent')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <DownOutlined style={{ color: 'white' }} />
                </div>
              </div>
                : ''}
              {authToken
                ? <SatList />
                : <Login />
            }

            </div>

            {satInfoModal?.open && (
              <SatInfoModal />
            )}

      </div>
  )
}

export default App
