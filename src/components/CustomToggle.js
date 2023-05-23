import React from 'react'
import CustomTilt from './CustomTilt'

const ToggleItem = ({ value, id, onSelect, children, style }) => (
    <CustomTilt borderRadius={24} opacity={0.8} glareEnable={!!(window.innerWidth >= 1024)}>
        <div className='border-white border p-3 w-24 text-center text-white cursor-pointer'
            style={{
              backgroundColor: value === id ? 'rgba(96, 237, 86, 0.4)' : undefined,
              transition: 'all 0.4s ease-in-out',
              ...style

            }}
            onClick={() => onSelect(id)}
        >
            {children}
        </div>
    </CustomTilt>
)

const CustomToggle = ({ value, onSelect, options }) => {
  return (
    <div className='flex cursor-pointer lg:rounded-3xl overflow-hidden'>
        <ToggleItem
            value={value}
            id={options[0].id}
            onSelect={onSelect}
            style={{
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24
            }}
        >{options[0].label}</ToggleItem>
        <ToggleItem
            value={value}
            id={options[1].id}
            onSelect={onSelect}
            style={{
              borderTopRightRadius: 24,
              borderBottomRightRadius: 24
            }}
        >{options[1].label}</ToggleItem>
    </div>
  )
}

export default CustomToggle
