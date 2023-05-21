import './index.css';
import { CustomGlobe } from './components/CustomGlobe';
import { useEffect, useState } from 'react';
import CustomTiltCard from './components/CustomTiltCard';
import { MyContext } from './store/Context';
import { client } from './helpers/axiosClient';
import './helpers/fontStyles.css'
import CustomToggle from './components/CustomToggle';
import CustomPagination from './components/CustomPagination';
import CustomFilters from './components/CustomFilters';
import { SAT_STATUS, SAT_TYPE } from './helpers/constants';

function App() {

  const [globeTexture, setGlobeTexture] = useState(3)

  const [starlinkData, setStarlinkData] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  const [dataFilters, setDataFilters] = useState({
    status: SAT_STATUS.BOTH,
    search: null,
    type: SAT_TYPE.ALL
  })

  const getDecayValue = (status) => {
    const {DECAYED, OPERATIONAL, BOTH} = SAT_STATUS
    switch(status) {
      case DECAYED:
        return { "$eq": null }
      case OPERATIONAL:
        return { "$ne": null }
      case BOTH:
      default:
        return undefined
    }
  }

  const getTypeValue = (type) => {
    const { ALL, PROTOTYPE, V09, V10, V15 } = SAT_TYPE
    switch(type) {
      case undefined:
      case null:
      case ALL:
        return { "$ne": null }
      default:
        return { "$eq": type }
    }
  }

  const postQuery = ({ 
      page = ( starlinkData?.page || 1 ), 
      limit = ( starlinkData?.limit || 10 ), 
      status = ( dataFilters?.status || 0),
      type = ( dataFilters?.type || undefined )
    }) => {
    setDataLoading(true)
    client.post('https://api.spacexdata.com/v4/starlink/query', {
      "query": {
          "latitude": getDecayValue(status),
          "version":  getTypeValue(type)
      },
      "options": {
          "limit": limit,
          "page": page,
          "pagination": true,
          "populate": [
              "launch"
          ],
          "sort":{
            "spaceTrack.LAUNCH_DATE":"desc"
         }
      }
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

  const handleFilters = ({ page,limit, status,type }) => {
    postQuery({ page,limit, status, type })
  }

  const getOperationalSats  = (list) => {
    return list?.filter(sat => !!sat.latitude) || []
  }

  return (
    <MyContext.Provider value={{starlinkData, setStarlinkData}}>
      <div className="App">
            <div className='w-screen h-screen flex bg-transparent' style={{backgroundImage: 'url(//unpkg.com/three-globe/example/img/night-sky.png)'  }}>
              <div className='flex flex-col bg-transparent'>
                <div className='mt-[40px] flex items-center justify-center cursor-grab'>
                  <CustomToggle 
                    value={globeTexture} 
                    onSelect={setGlobeTexture}
                    options={[
                        {id: 3, label: 'Simple'},
                        {id: 1, label: 'Detailed'}
                    ]}
                  />
                </div>
                <div>
                  <CustomGlobe 
                    globeTexture={globeTexture}
                    starList={getOperationalSats(starlinkData.docs)}
                    selectedSat={selectedSat}
                    handleSatSelect={handleSatSelect}
                  />
                </div>
              </div>
              <div className='flex-1 flex flex-col'>
                <div className='poppins-600-16 text-white uppercase mt-4 mb-2'>
                  <div>Starlink Satellites</div>
                  <CustomFilters 
                    className={'mt-2'}
                    loading={dataLoading}
                    data={dataFilters}
                    onChange={(type,value) => {
                      console.log(type,value)
                      setDataFilters({
                        ...dataFilters,
                        [type]: value
                      })
                      if(type === 'search') return
                      handleFilters({ [type] : value })

                      
                    }}
                  />
                </div>
                <CustomTiltCard 
                  loading={dataLoading}
                  starList={starlinkData.docs}
                  selectedSat={selectedSat}
                  handleSatSelect={handleSatSelect}
                />
                <CustomPagination 
                  loading={dataLoading}
                  starlinkData={starlinkData}
                  onPageChange={(page, limit) => {
                      console.log(page, limit)
                      handleFilters({ page,limit })
                  }} 
                  onLimitChange={(limit) => {
                    handleFilters({limit})
                  }}
                />
              </div>
            </div>

      </div>
    </MyContext.Provider>
  );
}

export default App;
