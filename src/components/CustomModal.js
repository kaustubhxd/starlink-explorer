import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt';
import CustomDataStrip from '../components/CustomDataStrip'
import { client } from '../helpers/axiosClient';
import { CloseCircleFilled } from '@ant-design/icons';

const CustomModal = ({ open, id, closeModal }) => {

    const [data, setData] = useState({})
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        if(!id) return
        setDataLoading(true)
        client.get(`https://api.spacexdata.com/v4/starlink/${id}`)
            .then(res => {
                console.log(res.data) 
                setData(res.data) 
        
            }).finally(() => {
                setDataLoading(false)
            })

    }, [id])

  if(!open) return ''

  return (
    <div 
        id='info-modal-bg'
        className='flex items-center justify-center '
        onClick={(e) => {
            e.stopPropagation()
            if(e.target.id === 'info-modal-bg') closeModal()
        }}
    >
        <Tilt
            glareEnable={true} 
            glareMaxOpacity={0.2} 
            glareColor="lightgreen" 
            glarePosition="all"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareBorderRadius='8px'
        >
        <div 
            className='rounded-xl border bg-[#161B22] opacity-90 p-6 overflow-hidden overflow-y-auto'
            style={{
                borderColor: '#56ED5C',
                borderWidth: '1px',
                transition: "all 0.2s ease-in-out"
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
                    >
                        <CloseCircleFilled 
                            style={{
                                color: 'white',
                                fontSize: '150%'
                            }} 
                        />
                    </div>
                </div>
            
            <div className='mt-1'>
                <div className='poppins-600-30 text-white capitalize'>{data?.spaceTrack?.OBJECT_NAME?.replace('-', ' ')}</div>
                {!data?.spaceTrack?.DECAYED && <div className='poppins-400-16 text-[#56ED5C]'>Operational</div>}
            </div>
            <div className='flex mt-4 lg:gap-10 gap-8 lg:flex-row flex-col'> 
                <div>
                    <div className='flex flex-col gap-y-1'>
                        <div className='poppins-500-16 text-white underline'>Major Events</div>
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Creation' value={data?.spaceTrack?.LAUNCH_DATE ? dayjs(data?.spaceTrack?.CREATION_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Launch' value={data?.spaceTrack?.LAUNCH_DATE ? dayjs(data?.spaceTrack?.LAUNCH_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Epoch' value={data?.spaceTrack?.EPOCH ? dayjs(data?.spaceTrack?.LAUNCH_DATE).format('LL') : '-'} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Decay' value={data?.spaceTrack?.DECAY_DATE ? dayjs(data?.spaceTrack?.DECAY_DATE).format('LL') : 'N/A'} />                                
                    </div>
                    <div className='mt-7 flex flex-col gap-y-1'>
                        <div className='poppins-500-16 text-white underline'>Geolocation Information</div>
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Latitude' value={data?.latitude?.toFixed(4)} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Longitude' value={data?.longitude?.toFixed(4)} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Height' value={`${data?.height_km?.toFixed(4)} km`} />
                        <CustomDataStrip fontSize={'14px'} minWidth='90px' label='Velocity' value={data?.velocity_kms && `${data?.velocity_kms?.toFixed(4)} km/s`} />                                
                    </div>
                </div>
                <div className='text-white'>
                    <div className='flex flex-col gap-y-1'>
                        <div className='poppins-500-16 text-white underline'>Technical Information</div>
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='OBJECT_NAME' value={data?.spaceTrack?.['OBJECT_NAME']} />
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='OBJECT_ID' value={data?.spaceTrack?.['OBJECT_ID']} />
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='OBJECT_TYPE' vvalue={data?.spaceTrack?.['OBJECT_TYPE']} />
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='PERIAPSIS' value={data?.spaceTrack?.['PERIAPSIS']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='SEMIMAJOR_AXIS' value={data?.spaceTrack?.['SEMIMAJOR_AXIS']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='SITE' value={data?.spaceTrack?.['SITE']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='INCLINATION' value={data?.spaceTrack?.['INCLINATION']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='CLASSIFICATION_TYPE' value={data?.spaceTrack?.['CLASSIFICATION_TYPE']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='COUNTRY_CODE' value={data?.spaceTrack?.['COUNTRY_CODE']} />                                
                            <CustomDataStrip fontSize={'14px'} minWidth='180px' label='CENTER_NAME' value={data?.spaceTrack?.['CENTER_NAME']} />                                
                    </div>
                </div>
            </div>
            </div>
        </Tilt>
    </div>
  )
}

export default CustomModal