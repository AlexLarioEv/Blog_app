import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

import './Loader.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 96 }} spin />

const Loader: React.FC = () => <Spin className="loader" indicator={antIcon} />

export default Loader
