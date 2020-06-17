import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Popover, Select } from 'antd';

const PopInput = ({ small = false, data, device, update, children }) => {
  if (small || (!data.textInput && !data.selectInput)) {
    return children;
  }
  const [value, setValue] = useState(data.value ? data.value(device) : '');
  const [popVisible, setPopVisible] = useState(false);

  const popover = (
    <Fragment>
      {data.textInput ? (
        <Input
          placeholder={data.name}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      ) : (
        <Select value={value} onChange={setValue} style={{ width: '100%' }}>
          {data.selectInput(device).map(i => (
            <Select.Option value={i} key={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      )}
      <Button
        block
        size="small"
        type="primary"
        style={{ marginTop: '5px' }}
        onClick={() => {
          update(data.sendType, {
            value
          });
          setPopVisible(false);
        }}
      >
        OK
      </Button>
    </Fragment>
  );

  return (
    <Popover
      trigger="click"
      title={data.name}
      content={popover}
      visible={popVisible}
      onVisibleChange={setPopVisible}
      placement="bottom"
    >
      {children}
    </Popover>
  );
};

PopInput.propTypes = {
  small: PropTypes.bool,
  data: PropTypes.object,
  device: PropTypes.object,
  update: PropTypes.func,
  children: PropTypes.node
};

export default PopInput;
