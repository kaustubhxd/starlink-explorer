import { space } from 'postcss/lib/list';
import React, { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import ReactTable from 'react-table'

const renderDataStrip = (label, value) => (
    <div className='flex gap-x-2 '>
        <div className='poppins-400-11 text-[#C6C6C6] w-[55px] min-w-[55px]'>{label}</div>
        <div className='poppins-500-11 text-white'>{value}</div>
    </div>
)

const CustomTiltCard = ({starList, selectedSat, handleSatSelect}) => {



    useEffect(() => {
        const element = document.querySelector(`#card-${selectedSat}`)
        console.log(element, 'egege')
        if(element) element.scrollIntoView({behavior: 'smooth'}) 
    },[selectedSat])

    return (
        <div 
        style={{
            display: 'grid',
            gridGap: '20px',
            gridTemplateColumns: 'repeat(auto-fit,180px)',
            gridTemplateRows: 'repeat(auto-fit,220px)',
            width: '100%',
            padding: '20px 0',
            overflow: 'hidden',
            overflowY: 'auto',
            flex: 1,
        }}
        >
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
                    style={{height: '220px', width: '180px'}}
                >
                    <div 
                        id={`card-${id}`}
                        className='h-[220px] w-[180px] rounded-xl border bg-[#161B22] opacity-80 p-4 cursor-pointer'
                        onClick={() => handleSatSelect(id)}
                        style={{
                            borderColor: selectedSat === id ? '#56ED5C' : '#606771',
                            borderWidth: selectedSat === id ? '2px' : '1px',
                            transition: "all 0.2s ease-in-out"
                        }}
                    >
                        <div className='w-9 h-4 bg-[#56ED5C] rounded-lg text-xs text-center text-[#161B22]'>
                            {version}
                        </div>    
                        <div className='mt-1'>
                            <div className='poppins-600-16 text-white capitalize'>{spaceTrack?.OBJECT_NAME?.replace('-', ' ')}</div>
                            <div className='poppins-400-10 text-[#768599]'>Launch: Nov 11, 2019</div>
                        </div>
                        <div className='mt-4 flex flex-col gap-y-1'>
                            {renderDataStrip('Latitude', latitude?.toFixed(4))}
                            {renderDataStrip('Longitude', longitude?.toFixed(4))}
                            {renderDataStrip('Height', height_km?.toFixed(4))}
                            {renderDataStrip('Velocity', `${velocity_kms?.toFixed(4)} km/s`)}
                        </div>
                    </div>
                </Tilt>
             ))} 
        </div>
    
    );
}


export default CustomTiltCard;
