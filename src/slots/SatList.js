import React, { useContext, useState } from 'react'
import CustomFilters from '../components/CustomFilters'
import CustomTiltCards from '../components/CustomTiltCards'
import CustomPagination from '../components/CustomPagination'
import { MyContext } from '../components/ContextProvider'
import { ConfigProvider, Popover } from 'antd'
import CustomButton from '../components/CustomButton'

const LogOut = ({ style }) => {
  const { handleLogout } = useContext(MyContext)

  const [open, setOpen] = useState(false)
  const hide = () => {
    setOpen(false)
  }
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
  }

  return (
    <div
      className='cursor-pointer flex items-center justify-end poppins-400-16 text-[rgba(255,255,255,0.8)] hover:underline hover:text-[rgba(255,255,255,1)]'
      style={style}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: 'black',
            colorText: 'white'

          }
        }}
      >
        <Popover
          content={
          <div className='flex gap-10'>
            <CustomButton
              onClick={hide}
              height={'35px'}
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleLogout}
              height={'35px'}
              primary
            >
              Yes, Logout
            </CustomButton>
          </div>}
          title="Are you sure you want to logout?"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div >Log Out</div>
        </Popover>
      </ConfigProvider>
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
