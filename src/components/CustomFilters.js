import { SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd'
import ConfigProvider from 'antd/es/config-provider';
import React, { useCallback, useEffect } from 'react'
import CustomSelect from './CustomSelect';
import { SAT_STATUS, SAT_TYPE } from '../helpers/constants';
import { DatePicker } from 'antd';
import debounce from 'lodash.debounce';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const CustomFilters = ({className, style, loading, data, onChange, onSearch}) => {

    // https://stackoverflow.com/questions/59383595/how-to-debounce-a-controlled-input
    // const getSearchResults = useCallback(
    //     debounce(value => {
    //       console.log('DEBOUNCE', value)
    //       onSearch('typed', value)
    //     }, 500),
    //     []
    //   );
    
    //   useEffect(() => {
    //     getSearchResults(data.search);
    //   }, [data.search]);

    return (
        <div className={className} style={style}>
            <div className='flex gap-4'>
                {/* <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#56ED5C',
                            colorBgContainer: 'transparent',
                            colorText: 'white',
                            colorTextPlaceholder: 'gray',
                            colorPrimaryActive: 'red',
                            controlOutline: 'transparent'

                        }
                    }}
                >
                <Input
                    placeholder="Search by name"
                    value={data['search']}
                    disabled={loading}
                    onChange={(e) => onSearch('searching', e.target.value)}
                    allowClear
                    style={{
                        width: 200,
                    }}
                    suffix={
                        <Tooltip title="Extra information">
                            <SearchOutlined style={{ color: 'white' }} />
                        </Tooltip>
                    }
                />
                </ConfigProvider> */}
                <div>
                    <CustomSelect 
                        disabled={loading}
                        value={data['status']}
                        onChange={(v) => onChange('status', v)}
                        options={[
                            { value: SAT_STATUS.BOTH, label: 'Any Status'},
                            { value: SAT_STATUS.OPERATIONAL, label: 'Operational' },
                            { value: SAT_STATUS.DECAYED, label: 'Decayed' },
                        ]}
                        style={{
                            width: '140px'
                        }}
                    />
                </div>
                <div>
                    <CustomSelect 
                        disabled={loading}
                        placeholder={'Type'}
                        value={data['type']}
                        onChange={(v) => onChange('type', v)}
                        options={[
                            { value: SAT_TYPE.ALL, label: 'All types' },
                            { value: SAT_TYPE.V15, label: 'Version 1.5' },
                            { value: SAT_TYPE.V10, label: 'Version 1.0' },
                            { value: SAT_TYPE.V09, label: 'Version 0.9' },
                            { value: SAT_TYPE.PROTOTYPE, label: 'Prototype' },
                        ]}
                        style={{
                            width: '140px'
                        }}
                    />
                </div>
            </div>
            <div className='mt-2'>
            <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#56ED5C',
                            colorBgContainer: 'transparent',
                            colorTextPlaceholder: 'gray',
                            colorPrimaryActive: 'red',
                            // colorBgBase: 'rgba(22, 27, 34,0.8)',
                            colorText: 'white',
                            colorBgElevated: 'rgba(22, 27, 34,0.95)',
                            // colorBorder:'red',
                            colorIcon: 'white',
                            colorTextDisabled: 'gray',
                            controlItemBgActive: 'black',
                            controlItemBgHover: '#56ED5C',
                            colorSplit: '#56ED5C',
                            colorTextLightSolid: 'black',
                            controlOutline: 'transparent',      
                        }
                    }}
            >
                <RangePicker 
                    allowEmpty={[true,true]}
                    onChange={(a,b,c) => {
                        console.log('ehehe',a,b,c)
                        const iso = b.map((date) => date ? dayjs(date).toISOString() : undefined)
                        console.log('isoooo', iso)
                        onChange('dateRange', { startDate: iso[0], endDate: iso[1] })
                    }}
                />
            </ConfigProvider>
            </div>
        </div>
    )
}

export default CustomFilters