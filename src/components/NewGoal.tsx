import React, { useState, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import { createGoal } from '../services/goal';
import ERROR from '../constants/error';
import { goalType } from '../constants/enum';
import transformNewGoal from '../utils/transformNewGoal';

const NewGoal: FunctionComponent<RouteComponentProps> = (props) => {
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

  /**
   * TODO Define values type.
   * @param values { title, description, period, type, amount }
   */
  const onFinish = async (values: any) => {
    setIsLoading(true);
    console.log(values);
    return;
    try {
      await createGoal(transformNewGoal(values));
      props.history.push('/');
    } catch (e) {
      // TODO Handle error
      setIsLoading(false);
    }
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
            <Option value={goalType.NUMBER}>Number</Option>
            <Option value={goalType.CHECKLIST}>Checklist</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.type !== currentValues.type
          }
        >
          {({ getFieldValue }) => {
            if (getFieldValue('type') === goalType.NUMBER) {
              return (
                <Form.Item name="amount" label="Amount">
                  <InputNumber />
                </Form.Item>
              );
            } else if (getFieldValue('type') === goalType.CHECKLIST) {
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
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewGoal;
