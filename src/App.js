import logo from './logo.svg';
import './index.css';
import { CustomGlobe } from './components/CustomGlobe';
import { useEffect, useState } from 'react';
import CustomTiltCard from './components/CustomTiltCard';
import { MyContext } from './store/Context';
import { client } from './helpers/axiosClient';
import './helpers/fontStyles.css'

function App() {

  const [globeTexture, setGlobeTexture] = useState(3)

  const [starlinkData, setStarlinkData] = useState()

  useEffect(() => {
    client.post('https://api.spacexdata.com/v4/starlink/query', {
      "query": {
          "latitude": {
              "$ne": null
          }
      },
      "options": {
          "limit": 10,
          "page": 1,
          "pagination": 1,
          "populate": [
              "launch"
          ]
      }
  }).then(res => {
      console.log(res.data)
      const list = res.data.docs
      console.log(list)        

      setStarlinkData(list)
  })

  }, [])

  const [selectedSat, setSelectedCard] = useState(null)
  const handleSatSelect = (id) => {
    setSelectedCard(id)
}


  return (
    <MyContext.Provider value={{starlinkData, setStarlinkData}}>
      <div className="App">
            <div className='w-screen h-screen flex bg-transparent' style={{backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)'  }}>
              <div className='flex flex-col bg-transparent'>
                <div className='mt-[40px] flex items-center justify-center cursor-grab'>
                  <div className='flex cursor-pointer'>
                    <div className='border-white border rounded-l-3xl p-3 w-24 text-center text-white cursor-pointer' onClick={() => setGlobeTexture(0)}>Simple</div>
                    <div className='border-white border text-white rounded-r-3xl p-3 w-24 text-center' onClick={() => setGlobeTexture(1)}>Detailed</div>
                  </div>
                </div>
                <div>
                  <CustomGlobe 
                    globeTexture={globeTexture}
                    starlinkData={starlinkData}
                    selectedSat={selectedSat}
                    handleSatSelect={handleSatSelect}
                  />
                </div>
              </div>
              <div className='flex-1'>
                <CustomTiltCard 
                  starlinkData={starlinkData}
                  selectedSat={selectedSat}
                  handleSatSelect={handleSatSelect}
                />
              </div>
            </div>

      </div>
    </MyContext.Provider>
  );
}

export default App;
