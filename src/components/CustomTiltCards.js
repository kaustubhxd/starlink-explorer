import dayjs from 'dayjs'
import React, { useContext, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'
import CustomDataStrip from './CustomDataStrip'
import { MyContext } from '../store/Context'
// import { SAT_STATUS, SAT_TYPE } from '../helpers/constants'
// import { SmileOutlined } from '@ant-design/icons'
// import { Empty } from 'antd'

const CustomTiltCards = ({ selectedSat, handleSatSelect, loading, handleModal, setFilters, handleFilters }) => {
  const starList = useContext(MyContext)?.starlinkData?.docs

  useEffect(() => {
    const element = document.querySelector(`#card-${selectedSat}`)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }, [selectedSat])

  return (
            <div
                style={{
                  display: 'grid',
                  gridGap: '20px',
                  gridTemplateColumns: 'repeat(auto-fit,180px)',
                  gridTemplateRows: 'repeat(auto-fit,220px)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  padding: '20px 20px',
                  overflow: 'hidden',
                  overflowY: loading ? 'hidden' : 'auto',
                  flex: 1,
                  position: 'relative'
                }}
            >
                {/* <div className='absolute top-[50%] left-[50%] z-10 w-full  bg-red text-white '>
                    <CustomSpinner spinning={loading}/>
                </div>
                {loading &&
                <div className='absolute w-full h-full z-20 bg-[rgba(0,0,0,0.5)] text-white'>
                </div>} */}
                {starList?.length === 0 &&
                    <div className='text-white text-center poppins-400-16'>
                        <div
                            className='flex flex-col items-center justify-center gap-y-2'
                        >
                            <img className='w-16' src={require('../assets/earth.png')} />
                            <div>No results found</div>
                        </div>
                        {/* <div className='mt-1 text-[rgba(30,144,255,0.8)] hover:underline hover:text-[rgba(30,144,255,1)] cursor-pointer'
                            onClick={() => {
                              const initialFilters = {
                                status: SAT_STATUS.BOTH,
                                type: SAT_TYPE.ALL,
                                dateRange: {
                                  startDate: null,
                                  endDate: null
                                }
                              }
                              setFilters(initialFilters)
                              handleFilters({
                                page: 1,
                                limit: 10,
                                ...initialFilters
                              }, 'clear')
                            }}
                        >Clear filters</div> */}
                    </div>
                    }
                {starList?.map(({ id, latitude, longitude, height_km: heightKm, velocity_kms: velocityKms, version, spaceTrack }) => (
                    <Tilt
                        key={id}
                        glareEnable={true}
                        glareMaxOpacity={0.2}
                        glareColor={'lightgreen'}
                        glarePosition="all"
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareBorderRadius='8px'
                        style={{ height: '230px', width: '180px' }}
                    >
                        <div
                            id={`card-${id}`}
                            className='h-[230px] w-[180px] rounded-xl border bg-[#161B22] opacity-80 p-4 cursor-pointer'
                            onMouseDown={(e) => {
                              console.log(e.target.id)
                              if (e.target.id === 'show-more-text') {
                                setTimeout(() => handleSatSelect(id), 300)
                              } else handleSatSelect(id)
                            }}
                            style={{
                              borderColor: selectedSat === id ? spaceTrack?.DECAYED ? '#FA7066' : '#56ED5C' : '#606771',
                              borderWidth: selectedSat === id ? '2px' : '1px',
                              transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            {version && <div className='w-fit px-2 h-4 bg-[dodgerblue] rounded-lg text-xs text-center text-[#161B22]'>
                                {version}
                            </div> }
                            <div className='mt-1'>
                                <div className='poppins-600-16 text-white capitalize'>{spaceTrack?.OBJECT_NAME?.replace('-', ' ')}</div>
                                <div className='poppins-400-10 text-[#768599]'>Launch:  {spaceTrack?.LAUNCH_DATE ? dayjs(spaceTrack?.LAUNCH_DATE).format('LL') : '-'}</div>
                                {spaceTrack?.DECAYED ? <div className='poppins-400-10 text-[#FA7066]'>Decay: {spaceTrack?.DECAY_DATE ? dayjs(spaceTrack?.DECAY_DATE).format('LL') : '-'}</div> : ''}
                                {!spaceTrack?.DECAYED && <div className='poppins-400-10 text-[#56ED5C]'>Operational</div>}
                            </div>
                            <div className='mt-4 flex flex-col gap-y-1'>
                                <CustomDataStrip label='Latitude' value={latitude?.toFixed(4)} />
                                <CustomDataStrip label='Longitude' value={longitude?.toFixed(4)} />
                                <CustomDataStrip label='Height' value={heightKm ? `${heightKm?.toFixed(4)} km` : undefined} />
                                <CustomDataStrip label='Velocity' value={velocityKms && `${velocityKms?.toFixed(4)} km/s`} />
                            </div>
                            <div
                                id = 'show-more-text'
                                className='poppins-400-10 mt-1 text-[rgba(30,144,255,0.8)] hover:underline hover:text-[rgba(30,144,255,1)]'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleModal(id)
                                }}
                                onTouchStart={(e) => {
                                  e.stopPropagation()
                                  handleModal(id)
                                }}
                            >
                                SHOW MORE
                            </div>
                        </div>
                    </Tilt>
                ))}
            </div>
  )
}

export default CustomTiltCards
