import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import CustomDataStrip from './CustomDataStrip';


const renderDataStrip = (label, value) => (
    <div className='flex gap-x-2 '>
        <div className='poppins-400-11 text-[#C6C6C6] w-[55px] min-w-[55px]'>{label}</div>
        <div className='poppins-500-11 text-white'>{value || '-'}</div>
    </div>
)

const CustomTiltCard = ({starList, selectedSat, handleSatSelect, loading, handleModal}) => {

    useEffect(() => {
        const element = document.querySelector(`#card-${selectedSat}`)
        if(element) element.scrollIntoView({behavior: 'smooth'}) 
    },[selectedSat])

    return (
            <div 
                style={{
                    display: 'grid',
                    gridGap: '20px',
                    gridTemplateColumns: 'repeat(auto-fit,180px)',
                    gridTemplateRows: 'repeat(auto-fit,220px)',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '20px 20px',
                    overflow: 'hidden',
                    overflowY: loading ? 'hidden' : 'auto',
                    flex: 1,
                    position: 'relative',
                }}
            >
                {/* <div className='absolute top-[50%] left-[50%] z-10 w-full  bg-red text-white '>
                    <CustomSpinner spinning={loading}/>
                </div>
                {loading && 
                <div className='absolute w-full h-full z-20 bg-[rgba(0,0,0,0.5)] text-white'>
                </div>} */}
                {starList?.map(({id, latitude,longitude, height_km, velocity_kms, version, spaceTrack, }) => (
                    <Tilt 
                        key={id}
                        glareEnable={true} 
                        glareMaxOpacity={0.2} 
                        glareColor="lightgreen" 
                        glarePosition="all"
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        glareBorderRadius='8px'
                        style={{height: '230px', width: '180px'}}
                    >
                        <div 
                            id={`card-${id}`}
                            className='h-[230px] w-[180px] rounded-xl border bg-[#161B22] opacity-80 p-4 cursor-pointer'
                            onMouseDown={() => handleSatSelect(id)}
                            style={{
                                borderColor: selectedSat === id ? '#56ED5C' : '#606771',
                                borderWidth: selectedSat === id ? '2px' : '1px',
                                transition: "all 0.2s ease-in-out"
                            }}
                        >
                            {version && <div className='w-fit px-2 h-4 bg-[dodgerblue] rounded-lg text-xs text-center text-[#161B22]'>
                                {version}
                            </div> }   
                            <div className='mt-1'>
                                <div className='poppins-600-16 text-white capitalize'>{spaceTrack?.OBJECT_NAME?.replace('-', ' ')}</div>
                                <div className='poppins-400-10 text-[#768599]'>Launch:  {spaceTrack?.LAUNCH_DATE ? dayjs(spaceTrack?.LAUNCH_DATE).format('LL') : '-'}</div>
                                {spaceTrack?.DECAYED ? <div className='poppins-400-10 text-[red]'>Decay: {spaceTrack?.DECAY_DATE ? dayjs(spaceTrack?.DECAY_DATE).format('LL') : '-'}</div> : ''}
                                {!spaceTrack?.DECAYED && <div className='poppins-400-10 text-[#56ED5C]'>Operational</div>}
                            </div>
                            <div className='mt-4 flex flex-col gap-y-1'>
                                <CustomDataStrip label='Latitude' value={latitude?.toFixed(4)} />
                                <CustomDataStrip label='Longitude' value={longitude?.toFixed(4)} />
                                <CustomDataStrip label='Height' value={height_km?.toFixed(4)} />
                                <CustomDataStrip label='Velocity' value={velocity_kms && `${velocity_kms?.toFixed(4)} km/s`} />                                
                            </div>
                            <div 
                                className='poppins-400-10 mt-1 text-[rgba(30,144,255,0.8)] hover:underline hover:text-[rgba(30,144,255,1)]'
                                onClick={() => {
                                    handleModal(id)
                                }}
                            >
                                SHOW MORE
                            </div>
                        </div>
                    </Tilt>
                ))} 
            </div>    
    );
}


export default CustomTiltCard;
