import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import * as THREE from 'three'
import Globe from 'react-globe.gl'
import dayjs from 'dayjs'
import { MyContext } from '../store/Context'
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const EARTH_RADIUS_KM = 6371 // km
const SAT_SIZE = 400 // km
const TIME_STEP = 3 * 1000 // per frame

const GLOBE_TEXTURES = [
  require('../assets/earth-water.png'),
  'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg',
  'https://cdn.discordapp.com/attachments/828364653800325120/1109426904005615756/earth-water2.png',
  'https://cdn.discordapp.com/attachments/828364653800325120/1109450421858218026/earth-water4.png'
]

export const CustomGlobe = ({ globeTexture, selectedSat, handleSatSelect }) => {
  const globeEl = useRef()

  const [globeRadius, setGlobeRadius] = useState()
  const [time, setTime] = useState(new Date())

  const getOperationalSats = (list) => {
    return list?.filter(sat => !!sat.latitude) || []
  }

  const starList = getOperationalSats(useContext(MyContext)?.starlinkData?.docs)

  useEffect(() => {
    // time ticker
    (function frameTicker () {
      requestAnimationFrame(frameTicker)
      setTime(time => new Date(+time + TIME_STEP))
    })()
  }, [])

  const handleGlobeRotate = (rotate = true) => {
    globeEl.current.controls().autoRotate = rotate
  }

  useEffect(() => {
    // load satellite data
    globeEl.current.controls().enableZoom = window.innerWidth >= 1024
    globeEl.current.controls().autoRotateSpeed = 0.4
    // globeEl.current.controls().enableRotate = window.innerWidth >= 1024
    handleGlobeRotate(true)
  }, [])

  const RADIUS = SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2

  const objectsData = useMemo(() => {
    if (!starList) return []

    return starList.map(d => {
      const id = d.id
      const name = d.spaceTrack.OBJECT_NAME
      const isSelected = selectedSat === id

      const lat = d.latitude
      const lng = d.longitude
      const alt = (d.height_km / EARTH_RADIUS_KM) * 2
      const color = isSelected ? '#56ED5C' : 'white'
      const size = isSelected ? RADIUS * 2 : RADIUS
      const launchDate = d.spaceTrack.LAUNCH_DATE

      return { id, name, lat, lng, alt, color, size, launchDate }
    })
  }, [starList, time])

  // console.log({objectsData})

  const satGeometry = (radius = RADIUS) => new THREE.OctahedronGeometry(radius, 0)
  const satMaterial = (color = 'white') => new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 0.7 })

  // const satObject = useMemo(() => {
  //   if (!globeRadius) return undefined;
  //   // const satGeometry = new THREE.SphereGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 32, 16);
  //   return new THREE.Mesh(satGeometry(), satMaterial());
  // }, [globeRadius]);

  useEffect(() => {
    setGlobeRadius(globeEl.current.getGlobeRadius())
    globeEl.current.pointOfView({ altitude: 3.0 })
  }, [])

  // https://codesandbox.io/s/offset-globe-bv763?file=/src/App.js:304-328
  // eslint-disable-next-line no-restricted-globals
  // const w = screen.availWidth
  // const shiftFactor = 0.55
  // const shiftAmmount = shiftFactor * w

  useEffect(() => {
    if (selectedSat) {
      const satellite = starList?.find((a) => a.id === selectedSat)
      if (!satellite) return
      const { latitude: lat, longitude: lng } = satellite
      console.log(selectedSat, lat, lng)
      globeEl.current.pointOfView({ lat, lng, altitude: 3 }, 700)
    }
  }, [selectedSat])

  return (
      <div
        className='globe-parent cursor-grab'
        style={{
          // marginLeft: `-${shiftAmmount}px`,
          // marginTop: '-70px',
          // backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)',
        }}
        onClick={(e) => {
          if (e.target.className === 'clickable') return
          handleSatSelect(null)
          handleGlobeRotate(true)
        }}
      >
        <Globe
          width={window.innerWidth < 1024 ? window.innerWidth : window.innerWidth / 2}
          height={window.innerHeight - 100}
          ref={globeEl}
          // width={w + shiftAmmount}
          globeImageUrl={GLOBE_TEXTURES[globeTexture]}
          objectsData={objectsData}
          // objectLabel={function (object) {
          //   return `<div class='scene-tooltip-container'>
          //             <div>${object.name}</div>
          //             <div>Launch: ${object.launchDate && dayjs(object.launchDate).format('LL')}</div>
          //           </div>`
          // }}
          objectLabel={function (object) {
            return `
                  <div class='rounded-xl border bg-[#161B22] opacity-80 p-2 cursor-pointer'>
                      <div class='poppins-600-16 text-white capitalize'>${object.name?.replace('-', ' ')}</div>
                      <div class='poppins-400-10 text-[#768599]'>Launch: ${object.launchDate && dayjs(object.launchDate).format('MMM D, YYYY')}</div>
                  </div>`
          }}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectFacesSurface={true}
          objectThreeObject={(d) => new THREE.Mesh(satGeometry(d.size), satMaterial(d.color))}
          onObjectClick={(props) => {
            handleSatSelect(props.id)
            handleGlobeRotate(false)
          }}
          onObjectHover={() => handleGlobeRotate(false)}
          // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          backgroundColor='rgba(0,0,0,0)'
        />
      </div>)
}
