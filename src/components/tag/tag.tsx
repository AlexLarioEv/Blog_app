import React from "react";
import { Space, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";

interface props {
  tagList: string[];
}
const Tags: React.FC<props> = (props) => {
  const { tagList } = props;

  const cropText = (text: string, len: number) => {
    if (text.length > len) {
      const newLen = text.indexOf(" ", len);
      return text.length > newLen ? `${text.slice(0, newLen)}...` : text;
    }
    return text;
  };

  const tabs = tagList.map((el) => {
    return <Tag key={uuidv4()}>{cropText(el, 10)}</Tag>;
  });
  return (
    <Space size={[0, 8]} wrap>
      {tabs}
    </Space>
  );
};

export default Tags;
