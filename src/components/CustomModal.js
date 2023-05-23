import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import CustomDataStrip from '../components/CustomDataStrip'
import { client } from '../helpers/axiosClient'
import { CloseCircleFilled, CloseCircleOutlined } from '@ant-design/icons'
import { Divider } from 'antd'
import CloseCircle from '../assets/closeCircle'

const CustomModal = ({ open, id, closeModal }) => {
  const [data, setData] = useState({})
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    setDataLoading(true)
    client.get(`/starlink/${id}`)
      .then(res => {
        console.log(res)
        console.log(res.data)
        setData(res.data)
      }).finally(() => {
        setDataLoading(false)
      })
  }, [id])

  const renderName = (name) => {
    const formatted = name?.replace('-', ' ')
    return formatted.charAt(0).toUpperCase() + formatted.substr(1).toLowerCase()
  }

  const [closeHovered, setCloseHovered] = useState(false)

  if (!open) return ''

  return (
    <div
        id='info-modal-bg'
        className='flex items-center justify-center '
        onClick={(e) => {
          e.stopPropagation()
          if (e.target.id === 'info-modal-bg') closeModal()
        }}
    >
        <Tilt
            glareEnable={!dataLoading}
            glareMaxOpacity={0.2}
            glareColor="lightgreen"
            glarePosition="all"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareBorderRadius='8px'
        >
        <div
            className='rounded-xl relative border bg-[#161B22] opacity-90 p-10 overflow-hidden overflow-y-auto'
            style={{
              borderColor: 'rgba(86, 237, 92, 0.5)',
              borderWidth: '1px',
              transition: 'all 0.2s ease-in-out'
            }}
            >
                <div className='flex justify-between'>
                    <div>
                        {data?.version && <div className='w-fit px-2 bg-[dodgerblue] h-fit rounded-2xl text-base text-center text-[#161B22]'>
                            {data?.version}
                        </div> }
                    </div>
                    <div className='cursor-pointer'
                    onClick={(e) => {
                      closeModal()
                    }}
                    style={{
                      transform: closeHovered ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseOver={() => setCloseHovered(true)}
                    onMouseOut={() => setCloseHovered(false)}
                >
                        <CloseCircle color={closeHovered ? 'rgba(77, 213, 83,1)' : 'rgba(77, 213, 83,0.6)'} />
                        {/* <CloseCircleOutlined
                            style={{
                              color: '#56ED5C',
                              fontSize: '150%'
                            }}
                        /> */}
                    </div>
                </div>

            <div className='mt-1'>
                <div className='poppins-600-30 text-white capitalize'>{ data?.spaceTrack?.OBJECT_NAME ? renderName(data?.spaceTrack?.OBJECT_NAME) : '-'}</div>
                <div className={`poppins-400-16 ${data?.spaceTrack?.DECAYED ? 'text-[red]' : 'text-[#56ED5C]'}`}>{data?.spaceTrack?.DECAYED ? 'Decayed' : 'Operational'}</div>
            </div>
            <div className='flex mt-4 lg:gap-10 gap-8 lg:flex-row flex-col'>
                <div>
                    <div className='flex flex-col gap-y-2'>
                        <img className='w-10' src={require('../assets/calendar.svg').default} alt='📅' />
                        <div className='poppins-700-13 text-white'>Major Events</div>
                        <Divider className='m-0 p-0 w-full my-1 h-[0.5px]'
                          style={{
                            backgroundColor: 'rgba(236, 255, 237, 0.19)'
                          }}
                        />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Creation' value={data?.spaceTrack?.LAUNCH_DATE ? dayjs(data?.spaceTrack?.CREATION_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Launch' value={data?.spaceTrack?.LAUNCH_DATE ? dayjs(data?.spaceTrack?.LAUNCH_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Epoch' value={data?.spaceTrack?.EPOCH ? dayjs(data?.spaceTrack?.LAUNCH_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Decay' value={data?.spaceTrack?.DECAY_DATE ? dayjs(data?.spaceTrack?.DECAY_DATE).format('LL') : 'N/A'} />
                    </div>
                    <div className='mt-7 flex flex-col gap-y-2'>
                        <img className='w-10' src={require('../assets/globe.svg').default} alt='🌐' />
                        <div className='poppins-700-13 text-white'>Geolocation Information</div>
                        <Divider className='m-0 p-0 w-full my-1 h-[0.5px]'
                          style={{
                            backgroundColor: 'rgba(236, 255, 237, 0.19)'
                          }}
                        />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Latitude' value={data?.latitude?.toFixed(4)} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Longitude' value={data?.longitude?.toFixed(4)} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Height' value={data?.height_km ? `${data?.height_km?.toFixed(4)} km` : ''} />
                        <CustomDataStrip fontSize={'12px'} minWidth='90px' label='Velocity' value={data?.velocity_kms && `${data?.velocity_kms?.toFixed(4)} km/s`} />
                    </div>
                </div>
                <div className='text-white'>
                    <div className='flex flex-col gap-y-2'>
                        <img className='w-10' src={require('../assets/settings.svg').default} alt='⚙️' />
                        <div className='poppins-700-13 text-white'>Technical Information</div>
                        <Divider className='m-0 p-0 w-full my-1 h-[0.5px]'
                          style={{
                            backgroundColor: 'rgba(236, 255, 237, 0.19)'
                          }}
                        />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Object Name' value={data?.spaceTrack?.OBJECT_NAME} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Object ID' value={data?.spaceTrack?.OBJECT_ID} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Object Type' vvalue={data?.spaceTrack?.OBJECT_TYPE} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Periapsis' value={data?.spaceTrack?.PERIAPSIS} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Semimajor Axis' value={data?.spaceTrack?.SEMIMAJOR_AXIS} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Site' value={data?.spaceTrack?.SITE} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Inclination' value={data?.spaceTrack?.INCLINATION} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Classification Type' value={data?.spaceTrack?.CLASSIFICATION_TYPE} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Country Code' value={data?.spaceTrack?.COUNTRY_CODE} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Center Name' value={data?.spaceTrack?.CENTER_NAME} />
                        <CustomDataStrip fontSize={'12px'} minWidth='180px' label='Originator' value={data?.spaceTrack?.ORIGINATOR} />

                        <div className='lg:hidden flex items-center justify-center mt-2'
                          onClick={(e) => {
                            closeModal()
                          }}
                        >
                          <CloseCircle color={closeHovered ? 'rgba(77, 213, 83,1)' : 'rgba(77, 213, 83,0.6)'} />
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </Tilt>
    </div>
  )
}

export default CustomModal
