import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CustomPagination from '../CustomPagination'
import { MyContext } from '../ContextProvider'

// Mock the matchMedia function
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
}))

describe('CustomPagination', () => {
  const mockData = {
    starlinkData: {
      totalDocs: 100,
      page: 1,
      limit: 10
    },
    dataLoading: false
  }

  it('renders the pagination component with correct values', () => {
    const { getByText } = render(
      <MyContext.Provider value={mockData}>
        <CustomPagination />
      </MyContext.Provider>
    )

    const totalItems = getByText('1-10 of 100 items')
    const selectOption = getByText('10 / page')

    expect(totalItems).toBeInTheDocument()
    expect(selectOption).toBeInTheDocument()
  })
})
