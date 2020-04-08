import React, { useState, FunctionComponent } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import ERROR from '../constants/error';

const NewGoal: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const formLayout = {
    labelCol: {
      sm: { span: 24 },
      md: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 16 },
    },
  };
  const noLabelLayout = {
    wrapperCol: {
      sm: { span: 24 },
      md: { span: 16, offset: 4 },
    },
  };

  const onFinish = (values: any) => {
    console.log(values);
    setIsLoading(true);
  };

  return (
    <div className="NewGoal">
      <Form {...formLayout} name="newGoal" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: ERROR.REQUIRED_TITLE }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="period" label="Period">
          <RangePicker />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select style={{ width: 120 }}>
            <Option value="number">Number</Option>
            <Option value="checklist">Checklist</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) => {
            if (getFieldValue('type') === 'number') {
              return (
                <>
                  <Form.Item name="amount" label="Amount">
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="unit" label="Unit">
                    <Input style={{ width: 90 }} />
                  </Form.Item>
                </>
              );
            } else if (getFieldValue('type') === 'checklist') {
              return (
                <>
                  <Form.Item {...noLabelLayout} name="newCheckbox">
                    <Input placeholder="Add an item" />
                  </Form.Item>
                  <Form.Item {...noLabelLayout}>
                    <Button>Add</Button>
                  </Form.Item>
                </>
              );
            }
          }}
        </Form.Item>
        <Form.Item {...noLabelLayout}>
          <Button type="primary" block>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewGoal;
