import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CustomToggle from '../CustomToggle'
import { MyContext } from '../ContextProvider'

describe('CustomToggle', () => {
  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ]

  it('renders the toggle options', () => {
    const { getByText } = render(
      <MyContext.Provider value={{ globalTexture: jest.fn() }}>
        <CustomToggle options={options} />
      </MyContext.Provider>

    )

    const option1 = getByText('Option 1')
    const option2 = getByText('Option 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('calls updateGlobalTexture with the selected option', () => {
    const mockUpdateGlobalTexture = jest.fn()
    const { getByText } = render(
      <MyContext.Provider value={{ updateGlobalTexture: mockUpdateGlobalTexture }}>
        <CustomToggle options={options} />
      </MyContext.Provider>
    )

    const option2 = getByText('Option 2')
    fireEvent.click(option2)

    expect(mockUpdateGlobalTexture).toHaveBeenCalledTimes(1)
    expect(mockUpdateGlobalTexture).toHaveBeenCalledWith(2) // Adjust the expected value based on your test case
  })
})
