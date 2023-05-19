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

    const objectsData = useMemo(() => {
      if (!starlinkData) return [];

      return starlinkData.map(d => {

          const name = d.spaceTrack.OBJECT_NAME
          const lat = d.latitude
          const lng = d.longitude
          const alt = (d.height_km / EARTH_RADIUS_KM) * 2;
          return { name, lat, lng, alt };
      });
    }, [starlinkData, time]);

    // console.log({objectsData})

    const [globeTexture, setGlobeTexture] = useState(require('../assets/earth-water.png'))

    const satObject = useMemo(() => {
      if (!globeRadius) return undefined;

      // const satGeometry = new THREE.SphereGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 32, 16);
      const satGeometry = new THREE.OctahedronGeometry( SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 0);;
      const satMaterial = new THREE.MeshLambertMaterial({ color: 'white', transparent: true, opacity: 0.7 });
      
      return new THREE.Mesh(satGeometry, satMaterial);

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
                      <div>North of Ascension Island</div>
                    </div>`
          }}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectFacesSurface={false}
          objectThreeObject={satObject}
          onObjectClick={(props) => {
            // console.log(props)
            const {lat, lng} = props
            globeEl.current.pointOfView({lat, lng, altitude: 3}, 700)

            console.log(globeEl.current.pointOfView({lat, lng, altitude: 3}, 700))
            // console.log(globeEl.current.getScreenCoords(lat, lng, 3))


            setTimeout(() => {

              // const sceneTooltip = document.querySelector('.scene-tooltip')
              // const sceneTooltipStatic = sceneTooltip.cloneNode(true)
              // // sceneTooltipStatic
  
              // sceneTooltip.parentElement.appendChild(sceneTooltipStatic)
  
              // console.log(sceneTooltipStatic)
            }, 800)
            // setGlobeTexture('https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg')

            

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

