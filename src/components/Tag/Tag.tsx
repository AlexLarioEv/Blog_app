import React from 'react'
import { Space, Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'

interface ITagsProps {
  tagList: string[]
}
const Tags: React.FC<ITagsProps> = (props) => {
  const { tagList } = props

  const cropText = (text: string, length: number) => {
    if (text.length > length) {
      const newLen = text.indexOf(' ', length)
      return text.length > newLen ? `${text.slice(0, newLen)}...` : text
    }
    return text
  }

  const tabs = tagList.map((tag) => {
    return <Tag key={uuidv4()}>{cropText(tag, 10)}</Tag>
  })
  return (
    <Space size={[0, 8]} wrap>
      {tabs}
    </Space>
  )
}

export default Tags
