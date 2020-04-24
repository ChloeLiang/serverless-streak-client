import React, { useState, useEffect, FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
  Modal,
  Button,
  Spin,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { v4 as uuid } from 'uuid';
import ERROR from '../constants/error';
import { goalType, inputLength } from '../constants/enum';
import { Checklist, GoalResponse, Goal } from '../constants/interface';
import { getGoal, deleteGoal } from '../services/goal';

interface Props {
  type: 'create' | 'save';
  submitCallback: (values: Goal, id?: string) => Promise<void>;
}

const GoalForm: FunctionComponent<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checklist, setChecklist] = useState<Checklist[]>([]);
  const [goal, setGoal] = useState<GoalResponse | null>(null);
  const [showCompletedItems, setShowCompletedItems] = useState(false);
  const [isEditingItemId, setIsEditingItemId] = useState('');

  const { id } = useParams();
  const history = useHistory();
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

  useEffect(() => {
    const onLoad = async () => {
      try {
        if (id) {
          setIsLoading(true);
          const goal: GoalResponse = await getGoal(id);
          setGoal(goal);
          setChecklist(goal.content.checklist || []);
          const {
            content: {
              title,
              description,
              startDate,
              endDate,
              type,
              amount,
              progress,
            },
          } = goal;
          form.setFieldsValue({
            title,
            description,
            period: startDate && [moment(startDate), moment(endDate)],
            type,
            amount,
            progress,
          });
          setIsLoading(false);
        }
      } catch (e) {
        // TODO: handle error
        console.error(e);
        setIsLoading(false);
      }
    };
    onLoad();
  }, [id, form]);

  /**
   * TODO Define values type.
   * @param values { title, description, period, type, amount }
   */
  const onFinish = async (values: any) => {
    const { title, description, period, type, amount, progress } = values;
    setIsLoading(true);
    const goalPayload: Goal = {
      title,
      description,
      startDate: period && period[0].format('YYYY-MM-DD'),
      endDate: period && period[1].format('YYYY-MM-DD'),
      type,
      amount,
      progress: progress
        ? progress || 0
        : checklist.filter((item) => item.isChecked).length,
    };
    if (checklist.length > 0) {
      goalPayload.checklist = checklist;
    }
    try {
      props.submitCallback(goalPayload, goal?.goalId);
      history.push('/');
    } catch (e) {
      // TODO Handle error
      setIsLoading(false);
    }
  };

  const onAddChecklistItem = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const addItemInputName = 'checklistItem';
    const itemValue = form.getFieldValue(addItemInputName);
    if (itemValue.length > inputLength.checklistItem) {
      return;
    }
    setChecklist(
      checklist.concat({
        id: uuid(),
        label: itemValue,
        isChecked: false,
      })
    );
    resetAddItemInput();
  };

  const onPasteChecklistItem = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData && e.clipboardData.getData('text');
    if (pasteData) {
      const splitData = pasteData.split('\n');
      resetAddItemInput();
      setChecklist(
        checklist.concat(
          splitData.map((item) => ({
            id: uuid(),
            label: item,
            isChecked: false,
          }))
        )
      );
    }
  };

  const onRemoveChecklistItem = (id: string) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const resetAddItemInput = () => {
    form.resetFields(['checklistItem']);
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    setChecklist(
      checklist.map((item) => {
        if (item.id === e.target.value) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  };

  const onEditItem = (item: Checklist) => {
    const { id, label } = item;
    setIsEditingItemId(id);
    form.setFieldsValue({
      editItem: label,
    });
  };

  const onCompleteEditingItem = (item: Checklist) => {
    const { id } = item;
    setChecklist(
      checklist.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            label: form.getFieldValue('editItem'),
          };
        }
        return item;
      })
    );
    setIsEditingItemId('');
  };

  const onToggleCompletedItems = () => {
    setShowCompletedItems(!showCompletedItems);
  };

  const onDeleteGoal = () => {
    Modal.confirm({
      title: 'Do you want to delete this goal?',
      icon: <ExclamationCircleOutlined />,
      content: 'You won’t be able to re-open this goal. There is no undo.',
      async onOk() {
        if (id) {
          try {
            await deleteGoal(id);
            history.push('/');
          } catch (e) {
            // TODO: Handle error
            console.error(e);
          }
        }
      },
    });
  };

  return (
    <Spin spinning={isLoading} size="large">
      <Form
        {...formLayout}
        form={form}
        name="goal"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: ERROR.REQUIRED_TITLE },
            {
              max: inputLength.title,
              message: `Maximum ${inputLength.title} characters`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              max: inputLength.description,
              message: `Maximum ${inputLength.description} characters`,
            },
          ]}
        >
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
                <>
                  <Form.Item name="amount" label="Amount">
                    <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                    name="progress"
                    label="Progress"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('amount') >= value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(ERROR.PROGRESS);
                        },
                      }),
                    ]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </>
              );
            } else if (getFieldValue('type') === goalType.CHECKLIST) {
              return (
                <>
                  {checklist.length > 0 && (
                    <Form.Item {...noLabelLayout}>
                      <div className="u-right">
                        <Button onClick={onToggleCompletedItems}>
                          {showCompletedItems ? 'Hide' : 'Show'} completed items
                        </Button>
                      </div>
                      {checklist.map((item) => {
                        if (
                          (item.isChecked && showCompletedItems) ||
                          !item.isChecked
                        ) {
                          return (
                            <Row key={item.id} justify="space-between">
                              <Col span={22}>
                                <Checkbox
                                  className="GoalForm__checkbox"
                                  value={item.id}
                                  checked={item.isChecked}
                                  onChange={onChangeCheckbox}
                                >
                                  {isEditingItemId === item.id ? (
                                    <Form.Item
                                      name="editItem"
                                      className="GoalForm__form-item"
                                    >
                                      <Input />
                                    </Form.Item>
                                  ) : (
                                    item.label
                                  )}
                                </Checkbox>
                              </Col>
                              {isEditingItemId === item.id ? (
                                <Col span={1} className="u-right">
                                  <CheckOutlined
                                    className="u-hover--primary"
                                    onClick={() => onCompleteEditingItem(item)}
                                  />
                                </Col>
                              ) : (
                                <Col span={1} className="u-right">
                                  <EditOutlined
                                    className="u-hover--primary"
                                    onClick={() => onEditItem(item)}
                                  />
                                </Col>
                              )}
                              <Col span={1} className="u-right">
                                <DeleteOutlined
                                  className="u-hover--error"
                                  onClick={() => onRemoveChecklistItem(item.id)}
                                />
                              </Col>
                            </Row>
                          );
                        }
                        return null;
                      })}
                    </Form.Item>
                  )}
                  <Form.Item
                    {...noLabelLayout}
                    name="checklistItem"
                    className="GoalForm__add-item-input"
                    rules={[
                      {
                        max: inputLength.checklistItem,
                        message: `Maximum ${inputLength.checklistItem} characters`,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Add an item"
                      onPaste={onPasteChecklistItem}
                      onPressEnter={onAddChecklistItem}
                      autoFocus
                    />
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
            data-testid="goal-submit"
          >
            {props.type.toUpperCase()}
          </Button>
        </Form.Item>
        {props.type === 'save' && (
          <Form.Item {...noLabelLayout}>
            <Button
              block
              danger
              loading={isLoading}
              onClick={onDeleteGoal}
              data-testid="goal-delete"
            >
              DELETE
            </Button>
          </Form.Item>
        )}
      </Form>
    </Spin>
  );
};

export default GoalForm;
