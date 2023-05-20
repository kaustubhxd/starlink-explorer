import { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three'
import Globe from 'react-globe.gl';

  const EARTH_RADIUS_KM = 6371; // km
  const SAT_SIZE = 400; // km
  const TIME_STEP = 3 * 1000; // per frame

  const GLOBE_TEXTURE_BLUE_MARBLE_URL = 'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg'

export const CustomGlobe = () => {
    const globeEl = useRef();
    const [starlinkData, setStarlinkData] = useState()

    const [globeRadius, setGlobeRadius] = useState();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      // time ticker
      (function frameTicker() {
        requestAnimationFrame(frameTicker);
        setTime(time => new Date(+time + TIME_STEP));
      })();
    }, []);

    useEffect(() => {
      // load satellite data
      globeEl.current.controls().enableZoom = false;
      // globeEl.current.controls().autoRotate = true;
      // globeEl.current.controls().autoRotateSpeed = 1;


      fetch('https://api.spacexdata.com/v4/starlink')
        .then(r => r.json())
        .then(res => {
          const data = res.filter(item => !!item.latitude).slice(0,200)
          console.log(data)

          setStarlinkData(data)
        })
    }, []);

    const [selectedSat, setSelectedSat] = useState(null)

    const RADIUS = SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2

    const objectsData = useMemo(() => {
      if (!starlinkData) return [];
      // console.log('hello')

      return starlinkData.map(d => {


          const name = d.spaceTrack.OBJECT_NAME
          const isSelected = selectedSat && selectedSat === name

          const lat = d.latitude
          const lng = d.longitude
          const alt = (d.height_km / EARTH_RADIUS_KM) * 2;
          const color = isSelected ? 'dodgerblue' : 'white'
          const size = isSelected ? RADIUS * 2 : RADIUS 
          const launchDate = d.spaceTrack.LAUNCH_DATE

          return { name, lat, lng, alt, color, size,launchDate };
      });
    }, [starlinkData, time]);

    // console.log({objectsData})

    const [globeTexture, setGlobeTexture] = useState(require('../assets/earth-water.png'))

    const satGeometry = (radius = RADIUS) =>  new THREE.OctahedronGeometry( radius, 0);;
    const satMaterial = (color='white') => new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 0.7 });

    const satObject = useMemo(() => {
      if (!globeRadius) return undefined;

      // const satGeometry = new THREE.SphereGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 32, 16);
      
      return new THREE.Mesh(satGeometry(), satMaterial());

    }, [globeRadius]);

    useEffect(() => {
      setGlobeRadius(globeEl.current.getGlobeRadius());
      globeEl.current.pointOfView({ altitude: 3.0 });
    }, []);

    return (
      <div 
        className='hello' 
        // style={{
        //   backgroundImage: `url(${'https://github.githubassets.com/images/modules/site/home-campaign/hero-bg.webp'})`,
        //   backgroundSize: 'cover'
        // }}
      >
        <Globe
          ref={globeEl}
          globeImageUrl={globeTexture}
          objectsData={objectsData}
          objectLabel={function (object) {
            return `<div class='scene-tooltip-container'>
                      <div>${object.name}</div>
                      <div>${object.launchDate}</div>
                    </div>`
          }}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectFacesSurface={false}
          objectThreeObject={(d) => {
            // console.log(d)
            return new THREE.Mesh(satGeometry(d.size), satMaterial(d.color))
          }}
          onObjectClick={(props,e,cords) => {
            // console.log(props)
            
            const {lat, lng} = props
            globeEl.current.pointOfView({lat, lng, altitude: 3}, 700)

            setSelectedSat(props.name)
            console.log(props)

          }}
          onObjectHover={(props) => {
            // console.log('hover', props)
          }}
          // bumpImageUrl={require('../assets/elev_bump_8k.jpg')}
          // showAtmosphere
          backgroundImage={'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg'}
          // backgroundColor="red"    
          // showGraticules  
        />
      </div>);
  };

