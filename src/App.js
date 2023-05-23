import './index.css'
import { CustomGlobe } from './components/CustomGlobe'
import React, { useEffect, useState } from 'react'
import CustomTiltCard from './components/CustomTiltCard'
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

function App () {
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
    status = (dataFilters?.status || 0),
    type = (dataFilters?.type || undefined),
    // search = ( dataFilters?.search || undefined ),
    dateRange = (dataFilters?.dateRange || undefined)
  }, actionType) => {
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
      console.log(res.data)
      const data = res.data
      console.log(data)

      setStarlinkData(data)
    }).finally(() => {
      setDataLoading(false)
    })
  }

  useEffect(() => {
    postQuery({})
  }, [])

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

  return (
    <MyContext.Provider value={{ starlinkData, setStarlinkData }}>
      <div className="App relative lg:overflow-hidden">
            <div className='lg:h-screen flex flex-col lg:flex-row bg-transparent' style={{ backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)' }}>
              <div className='flex flex-col bg-transparent h-screen relative'>
                <div className='mt-[40px] flex items-center justify-center cursor-grab'>
                  <CustomToggle
                    value={globeTexture}
                    onSelect={setGlobeTexture}
                    options={[
                      { id: 3, label: 'Simple' },
                      { id: 1, label: 'Detailed' }
                    ]}
                  />
                </div>
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
              <div id='list-parent' className='flex flex-col lg:h-[unset] h-screen lg:w-full'>
                <div className='poppins-600-16 text-white uppercase mt-4 mb-2'>
                  {/* <div className='text-center lg:text-start'>Starlink Satellites</div> */}
                  <CustomFilters
                    className={'mt-5 flex flex-wrap gap-x-4 items-baseline mb-2 justify-center'}
                    loading={dataLoading}
                    data={dataFilters}
                    onChange={(actionType, value) => {
                      console.log(actionType, value)
                      setDataFilters({
                        ...dataFilters,
                        [actionType]: value
                      })
                      handleFilters({ [actionType]: value }, actionType)
                    }}
                    onSearch={(actionType, value) => {
                      if (actionType === 'searching') {
                        setDataFilters({
                          ...dataFilters,
                          search: value
                        })
                      } else {
                        handleFilters({ search: value }, actionType)
                      }
                    }}
                  />
                </div>
                <CustomTiltCard
                  loading={dataLoading}
                  selectedSat={selectedSat}
                  handleSatSelect={handleSatSelect}
                  handleModal={handleModal}
                />
                <CustomPagination
                  loading={dataLoading}
                  onPageChange={(page, limit, a, b, c, d) => {
                    console.log(page, limit, a, b, c, d)
                    handleFilters({ page }, 'page')
                  }}
                  onLimitChange={(limit) => {
                    handleFilters({ limit }, 'limit')
                  }}
                />
              </div>
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
