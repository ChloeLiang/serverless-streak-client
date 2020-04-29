import React, { FunctionComponent } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const ScrollButton: FunctionComponent = () => {
  const onScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="ScrollButton">
      <Button
        className="u-margin-bottom-sm"
        shape="circle"
        icon={<UpOutlined />}
        onClick={onScrollToTop}
      />
      <Button
        shape="circle"
        icon={<DownOutlined />}
        onClick={onScrollToBottom}
      />
    </div>
  );
};

export default ScrollButton;
