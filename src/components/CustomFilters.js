import { SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd'
import ConfigProvider from 'antd/es/config-provider';
import React from 'react'
import CustomSelect from './CustomSelect';
import { SAT_STATUS } from '../helpers/constants';

const CustomFilters = ({className, style, loading, data, onChange}) => {

    return (
        <div className={className} style={style}>
            <div className='flex gap-4'>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#56ED5C',
                            colorBgContainer: 'transparent',
                            colorText: 'white',
                            colorTextPlaceholder: 'gray',
                            colorPrimaryActive: 'red'
                        }
                    }}
                >
                    <Input
                        placeholder="Search by name"
                        value={data['search']}
                        disabled={loading}
                        onChange={(e) => onChange('search', e.target.value)}
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
                </ConfigProvider>
                <div>
                    <CustomSelect 
                        disabled={loading}
                        value={data['status']}
                        onChange={(v) => onChange('status', v)}
                        options={[
                            { value: SAT_STATUS.OPERATIONAL, label: 'Operational' },
                            { value: SAT_STATUS.DECAYED, label: 'Decayed' },
                            { value: SAT_STATUS.BOTH, label: 'Both'}
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomFilters