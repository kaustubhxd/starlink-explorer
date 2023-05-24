import React from 'react'
import CustomFilters from '../components/CustomFilters'
import CustomTiltCards from '../components/CustomTiltCards'
import CustomPagination from '../components/CustomPagination'

const SatList = ({
  loading,
  filters,
  setFilters,
  handleFilters,
  selectedSat,
  handleSatSelect,
  handleModal
}) => {
  return (
    <div id='list-parent' className='flex flex-col lg:h-[unset] h-screen lg:w-full'>
                <div className='poppins-600-16 text-white uppercase mt-4 mb-2'>
                  {/* <div className='text-center lg:text-start'>Starlink Satellites</div> */}
                  <CustomFilters
                    filters={filters}
                    className={'mt-5 flex flex-wrap gap-x-4 items-baseline mb-2 justify-center'}
                    loading={loading}
                    data={filters}
                    onChange={(actionType, value) => {
                      console.log(actionType, value)
                      setFilters({
                        ...filters,
                        [actionType]: value
                      })
                      handleFilters({ [actionType]: value }, actionType)
                    }}
                    onSearch={(actionType, value) => {
                      if (actionType === 'searching') {
                        setFilters({
                          ...filters,
                          search: value
                        })
                      } else {
                        handleFilters({ search: value }, actionType)
                      }
                    }}
                  />
                </div>
                <CustomTiltCards
                  loading={loading}
                  selectedSat={selectedSat}
                  handleSatSelect={handleSatSelect}
                  handleModal={handleModal}
                  setFilters={setFilters}
                  handleFilters={handleFilters}
                />
                <CustomPagination
                  loading={loading}
                  onPageChange={(page, limit, a, b, c, d) => {
                    console.log(page, limit, a, b, c, d)
                    handleFilters({ page }, 'page')
                  }}
                  onLimitChange={(limit) => {
                    handleFilters({ limit }, 'limit')
                  }}
                />
              </div>
  )
}

export default SatList
