import React from 'react'
import { render } from '@testing-library/react'
import CustomDataStrip from '../CustomDataStrip'

describe('CustomDataStrip', () => {
  it('renders label and value correctly', () => {
    const label = 'Test Label'
    const value = 'Test Value'
    const { getByText } = render(<CustomDataStrip label={label} value={value} />)

    expect(getByText(label)).toBeInTheDocument()
    expect(getByText(value)).toBeInTheDocument()
  })

  it('renders "-" when value prop is not provided', () => {
    const label = 'Test Label'
    const { getByText } = render(<CustomDataStrip label={label} />)

    expect(getByText(label)).toBeInTheDocument()
    expect(getByText('-')).toBeInTheDocument()
  })

  it('applies custom styles correctly', () => {
    const label = 'Test Label'
    const value = 'Test Value'
    const fontSize = '14px'
    const fontWeight = 600
    const minWidth = '80px'
    const { getByText } = render(
      <CustomDataStrip
        label={label}
        value={value}
        fontSize={fontSize}
        fontWeight={fontWeight}
        minWidth={minWidth}
      />
    )
    const labelElement = getByText(label)
    const valueElement = getByText(value)

    expect(labelElement).toHaveStyle(`font-size: ${fontSize}`)
    expect(labelElement).toHaveStyle(`font-weight: ${fontWeight}`)
    expect(labelElement).toHaveStyle(`min-width: ${minWidth}`)

    expect(valueElement).toHaveStyle(`font-size: ${fontSize}`)
    expect(valueElement).toHaveStyle(`font-weight: ${fontWeight}`)
  })
})
