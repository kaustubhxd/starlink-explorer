import logo from './logo.svg';
import './index.css';
import { CustomGlobe } from './components/CustomGlobe';
import { useEffect, useState } from 'react';
import CustomTiltCard from './components/CustomTiltCard';
import { MyContext } from './store/Context';
import { client } from './helpers/axiosClient';
import './helpers/fontStyles.css'
import { ConfigProvider, Pagination,Select } from 'antd';
import CustomToggle from './components/CustomToggle';

function App() {

  const [globeTexture, setGlobeTexture] = useState(3)

  const [starlinkData, setStarlinkData] = useState([])


  const postQuery = (page = 1, limit = 10) => {
    client.post('https://api.spacexdata.com/v4/starlink/query', {
      "query": {
          "latitude": {
              "$ne": null
          }
      },
      "options": {
          "limit": limit,
          "page": page,
          "pagination": true,
          "populate": [
              "launch"
          ]
      }
    }).then(res => {
        console.log(res.data)
        const data = res.data
        console.log(data)        

        setStarlinkData(data)
    })
  }

  useEffect(() => {
    postQuery()
  }, [])

  const [selectedSat, setSelectedCard] = useState(null)
  const handleSatSelect = (id) => {
    setSelectedCard(id)
  }

  const handlePaginate = (page,limit) => {
    postQuery(page,limit)
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
                        {id: 0, label: 'Simple'},
                        {id: 1, label: 'Detailed'}
                    ]}
                  />
                </div>
                <div>
                  <CustomGlobe 
                    globeTexture={globeTexture}
                    starList={starlinkData.docs}
                    selectedSat={selectedSat}
                    handleSatSelect={handleSatSelect}
                  />
                </div>
              </div>
              <div className='flex-1 flex flex-col'>
                <div className='poppins-600-16 text-white uppercase my-4'>Operational Starlink Satellites</div>
                <CustomTiltCard 
                  starList={starlinkData.docs}
                  selectedSat={selectedSat}
                  handleSatSelect={handleSatSelect}
                />
                <div className='my-2 flex'>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#56ED5C',
                        colorBgContainer: 'black',
                        colorBgTextActive: '#56ED5C',
                        colorText: 'white',
                        colorBorder: 'transparent',
                        colorBgElevated: 'black',
                        colorTextDisabled: 'gray',
                      },
                    }}
                  >
                      <Pagination 
                        size="default" 
                        showSizeChanger={false}
                        total={starlinkData?.totalDocs || 0} 
                        current={starlinkData?.page || 0}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        pageSize={starlinkData?.limit || 0}
                        onChange={(page, limit) => {
                          console.log(page, limit)
                          handlePaginate(page,limit)
                        }}
                      />
                  </ConfigProvider>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgContainer: 'black',
                        colorText: 'white',
                        // colorPrimary: '#56ED5C',
                        colorBgElevated:'black',
                        colorPrimaryBg: 'rgba(94, 237, 86, 0.5)',
                        colorTextBase: 'white',
                      }
                    }}
                  >
                    <Select
                      value={starlinkData?.limit}
                      onChange={(limit) => {
                        handlePaginate(starlinkData.page,limit)
                      }}
                      options={[
                        { value: 10, label: '10 / page' },
                        { value: 20, label: '20 / page' },
                        { value: 50, label: '50 / page' },
                      ]}
                    />
                  </ConfigProvider>
                
                </div>

              </div>
            </div>

      </div>
    </MyContext.Provider>
  );
}

export default App;
