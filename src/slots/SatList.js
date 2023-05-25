import React, { useContext } from 'react'
import CustomFilters from '../components/CustomFilters'
import CustomTiltCards from '../components/CustomTiltCards'
import CustomPagination from '../components/CustomPagination'
import { MyContext } from '../components/ContextProvider'

const LogOut = ({ style }) => {
  const { handleLogout } = useContext(MyContext)

  return (
    <div
      onClick={() => handleLogout()}
      className='cursor-pointer flex items-center justify-end poppins-400-16 text-[rgba(30,144,255,0.8)] hover:underline hover:text-[rgba(30,144,255,1)]'
      style={style}
    >
      Log Out
    </div>
  )
}

const SatList = () => {
  const { dataFilters: filters, updateDataFilters } = useContext(MyContext)

  return (
    <div id='list-parent' className='flex flex-col lg:h-[unset] h-screen lg:w-full'>
                <div className='poppins-600-16 text-white uppercase mt-2 mb-2'>
                  {/* <div className='text-center lg:text-start'>Starlink Satellites</div> */}
                  <CustomFilters
                    className={'mt-2 flex flex-wrap gap-x-4 items-baseline mb-2 justify-center'}
                  />
                </div>
                <CustomTiltCards />
                <CustomPagination
                  onPageChange={(page, limit, a, b, c, d) => {
                    console.log(page, limit, a, b, c, d)
                    updateDataFilters({ page }, 'page')
                  }}
                  onLimitChange={(limit) => {
                    updateDataFilters({ limit }, 'limit')
                  }}
                />
                {<LogOut style={{ padding: '0px 40px 5px 0' }} />}

              </div>
  )
}

export default SatList
