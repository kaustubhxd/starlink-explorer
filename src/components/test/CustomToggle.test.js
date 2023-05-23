import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CustomToggle from '../CustomToggle'

describe('CustomToggle', () => {
  const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' }
  ]

  it('renders toggle items with correct labels', () => {
    const value = 'option1'
    const onSelect = jest.fn()
    const { getByText } = render(<CustomToggle value={value} onSelect={onSelect} options={options} />)

    expect(getByText('Option 1')).toBeInTheDocument()
    expect(getByText('Option 2')).toBeInTheDocument()
  })

  it('calls onSelect with the selected option id', () => {
    const value = 'option1'
    const onSelect = jest.fn()
    const { getByText } = render(<CustomToggle value={value} onSelect={onSelect} options={options} />)

    const option2 = getByText('Option 2')
    fireEvent.click(option2) // Simulate option selection

    expect(onSelect).toHaveBeenCalledWith('option2')
  })

  it('applies active style to the selected toggle item', () => {
    const value = 'option1'
    const onSelect = jest.fn()
    const { getByText } = render(<CustomToggle value={value} onSelect={onSelect} options={options} />)

    const option1 = getByText('Option 1')
    const option2 = getByText('Option 2')

    expect(option1).toHaveStyle('background-color: rgba(96, 237, 86, 0.4)')
    expect(option2).not.toHaveStyle('background-color: rgba(96, 237, 86, 0.4)')
  })
})
