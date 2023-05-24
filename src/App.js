import './index.css'
import { CustomGlobe } from './components/CustomGlobe'
import React, { useEffect, useState } from 'react'
import CustomTiltCards from './components/CustomTiltCards'
import { MyContext } from './store/Context'
import { client } from './helpers/axiosClient'
import './helpers/fontStyles.css'
import CustomToggle from './components/CustomToggle'
import CustomPagination from './components/CustomPagination'
import CustomFilters from './components/CustomFilters'
import { SAT_STATUS, SAT_TYPE } from './helpers/constants'
import CustomModal from './components/CustomModal'
import { DownOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import SatList from './slots/SatList'
import CustomInput from './components/CustomInput'
import Login from './slots/Login'
import useWindowSize from './hooks/useWindowSize'

function App () {
  const [authState, setAuthState] = useState({
    token: null
  })

  const [globeTexture, setGlobeTexture] = useState(3)

  const [starlinkData, setStarlinkData] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  const [dataFilters, setDataFilters] = useState({
    status: SAT_STATUS.BOTH,
    search: null,
    type: SAT_TYPE.ALL,
    dateRange: null
  })

  const [infoModal, setInfoModal] = useState({
    open: false,
    id: null
  })

  const postQuery = ({
    page = (starlinkData?.page || 1),
    limit = (starlinkData?.limit || 10),
    status = (dataFilters?.status),
    type = (dataFilters?.type || SAT_TYPE.ALL),
    // search = ( dataFilters?.search || undefined ),
    dateRange = (dataFilters?.dateRange || undefined)
  }, actionType) => {
    console.log({ page, limit, status, type, dateRange }, actionType)

    setDataLoading(true)

    const resetPage = actionType !== 'page'
    console.log('resetPage: ', actionType, resetPage)

    client.post('/starlink/query', {
      page: resetPage ? 1 : page,
      limit,
      status,
      type,
      dateRange
    }).then(res => {
      // console.log(res.data)
      const data = res.data
      console.log(data)

      setStarlinkData(data)
    }).finally(() => {
      setDataLoading(false)
    })
  }

  useEffect(() => {
    if (authState.token) {
      postQuery({})
    }
  }, [authState.token])

  const [selectedSat, setSelectedCard] = useState(null)
  const handleSatSelect = (id) => {
    setSelectedCard(id)
  }

  const handleFilters = ({ page, limit, status, type, search, dateRange }, actionType) => {
    postQuery({ page, limit, status, type, search, dateRange }, actionType)
  }

  const handleModal = (id) => {
    setInfoModal({
      id, open: !!id
    })
  }

  const { isMobile } = useWindowSize()

  return (
    <MyContext.Provider value={{ starlinkData, setStarlinkData, authState, setAuthState }}>
      <div className="App relative lg:overflow-hidden">
            <div className='lg:h-screen flex flex-col lg:flex-row bg-transparent' style={{ backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)' }}>
              { (!isMobile || (isMobile && !!authState?.token))
                ? <div className='flex flex-col bg-transparent h-screen relative'>
                {<div className='mt-[40px] flex items-center justify-center cursor-grab'>
                  <CustomToggle
                    value={globeTexture}
                    onSelect={setGlobeTexture}
                    options={[
                      { id: 3, label: 'Simple' },
                      { id: 1, label: 'Detailed' }
                    ]}
                  />
                </div>}
                <div>
                  <CustomGlobe
                    globeTexture={globeTexture}
                    selectedSat={selectedSat}
                    handleSatSelect={handleSatSelect}
                  />
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
              {authState?.token
                ? <SatList
                    loading={dataLoading}
                    filters={dataFilters}
                    setFilters={setDataFilters}
                    handleFilters={handleFilters}
                    selectedSat={selectedSat}
                    handleSatSelect={handleSatSelect}
                    handleModal={handleModal}
                  />
                : <Login />
            }

            </div>

            {infoModal?.open && (
              <Modal
                open={infoModal?.open}
                centered
                maskClosable
                bodyStyle={{
                  padding: 0,
                  margin: 0
                }}
                footer={null}
                closable={false}
              >
                <CustomModal
                    open={infoModal?.open}
                    id={infoModal?.id}
                    closeModal={() => handleModal()}
                  />
              </Modal>
            )}

      </div>
    </MyContext.Provider>
  )
}

export default App
