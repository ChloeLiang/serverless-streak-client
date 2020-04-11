import React, { useState, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Button,
} from 'antd';
import { v4 as uuid } from 'uuid';
import { createGoal } from '../services/goal';
import ERROR from '../constants/error';
import { goalType } from '../constants/enum';
import { Checklist } from '../constants/interface';
import transformNewGoal from '../utils/transformNewGoal';

const NewGoal: FunctionComponent<RouteComponentProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checklist, setChecklist] = useState<Checklist[]>([]);

  const [form] = Form.useForm();

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
    try {
      await createGoal(transformNewGoal({ ...values, checklist }));
      props.history.push('/');
    } catch (e) {
      // TODO Handle error
      setIsLoading(false);
    }
  };

  const onAddChecklistItem = () => {
    const addItemInputName = 'checklistItem';
    const itemValue = form.getFieldValue(addItemInputName);
    setChecklist(
      checklist.concat({
        id: uuid(),
        label: itemValue,
        isChecked: false,
      })
    );
    form.resetFields([addItemInputName]);
  };

  return (
    <div className="NewGoal">
      <Form {...formLayout} form={form} name="newGoal" onFinish={onFinish}>
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
                  {checklist.length > 0 && (
                    <Form.Item {...noLabelLayout} name="checklist">
                      <Checkbox.Group>
                        {checklist.map((item) => (
                          <Checkbox
                            className="NewGoal__checkbox"
                            key={item.id}
                            value={item.id}
                            checked={item.isChecked}
                          >
                            {item.label}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  )}
                  <Form.Item
                    {...noLabelLayout}
                    name="checklistItem"
                    className="NewGoal__add-item-input"
                  >
                    <Input placeholder="Add an item" />
                  </Form.Item>
                  <Form.Item {...noLabelLayout}>
                    <Button htmlType="button" onClick={onAddChecklistItem}>
                      Add Item
                    </Button>
                  </Form.Item>
                </>
              );
            }
          }}
        </Form.Item>
        <Form.Item {...noLabelLayout}>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={isLoading}
            data-testid="createGoal-submit"
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewGoal;
