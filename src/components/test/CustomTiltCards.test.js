import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import dayjs from 'dayjs'
import CustomTiltCards from '../CustomTiltCards'
import { MyContext } from '../ContextProvider'

Element.prototype.scrollIntoView = jest.fn()

describe('CustomTiltCards', () => {
  const mockData = {
    starlinkData: {
      docs: [
        {
          id: 1,
          latitude: 37.7749,
          longitude: -122.4194,
          height_km: 500,
          velocity_kms: 7.5,
          version: '1.0',
          spaceTrack: {
            OBJECT_NAME: 'Satellite 1',
            LAUNCH_DATE: '2023-05-20',
            DECAYED: false
          }
        },
        {
          id: 2,
          latitude: 40.7128,
          longitude: -74.006,
          height_km: 600,
          velocity_kms: 8.2,
          version: '2.0',
          spaceTrack: {
            OBJECT_NAME: 'Satellite 2',
            LAUNCH_DATE: '2023-05-21',
            DECAYED: true,
            DECAY_DATE: '2023-06-05'
          }
        }
      ]
    }
  }

  const selectedSat = 1
  const handleSatSelect = jest.fn()
  const loading = false
  const handleModal = jest.fn()

  it('calls handleSatSelect when a card is clicked', () => {
    const { getByText } = render(
      <MyContext.Provider value={mockData}>
        <CustomTiltCards
          selectedSat={selectedSat}
          handleSatSelect={handleSatSelect}
          loading={loading}
          handleModal={handleModal}
        />
      </MyContext.Provider>
    )

    const card1 = getByText('Satellite 1')
    fireEvent.mouseDown(card1)
    expect(handleSatSelect).toHaveBeenCalledWith(1)

    const card2 = getByText('Satellite 2')
    fireEvent.mouseDown(card2)
    expect(handleSatSelect).toHaveBeenCalledWith(2)
  })

  // TODO: Add more
})
