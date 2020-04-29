import React, { useState, useEffect, FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RangeValue } from 'rc-picker/lib/interface';
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
import { onError } from '../services/logger';
import { tagEvent } from '../services/analytics';
import getTargetProgressPerDay from '../utils/getTargetProgressPerDay';
import ScrollButton from './ScrollButton';

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
  const [autoFocusAddItem, setAutoFocusAddItem] = useState(false);
  const [targetProgress, setTargetProgress] = useState(-1);

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
          setTargetProgress(
            getTargetProgressPerDay(
              startDate,
              endDate,
              amount || goal.content.checklist?.length
            )
          );
          setIsLoading(false);
        }
      } catch (e) {
        onError(e);
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
      await props.submitCallback(goalPayload, goal?.goalId);
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
    tagEvent({
      category: 'Type',
      action: 'Choose goal type',
      label: props.type,
      value: type,
      nonInteraction: true,
    });
    tagEvent({
      category: 'Amount',
      action: 'Enter goal amount',
      label: props.type,
      value: amount || 0,
      nonInteraction: true,
    });
    tagEvent({
      category: 'Checklist Items',
      action: 'Add number of checklist items',
      label: props.type,
      value: checklist ? checklist.length : 0,
      nonInteraction: true,
    });
  };

  const onPeriodChange = (
    _: RangeValue<moment.Moment>,
    format: [string, string]
  ) => {
    let amount = form.getFieldValue('amount') || 0;
    if (checklist.length > 0) {
      amount = checklist.length;
    }
    if (format[0] && amount > 0) {
      setTargetProgress(getTargetProgressPerDay(format[0], format[1], amount));
    }
  };

  const getTargetProgressOnAmountChange = (value: number | undefined) => {
    const period = form.getFieldValue('period');
    if ((!value && targetProgress >= 0) || !period) {
      return -1;
    }
    const startDate = period[0].format('YYYY-MM-DD');
    const endDate = period[1].format('YYYY-MM-DD');
    return getTargetProgressPerDay(startDate, endDate, value);
  };

  const onAmountChange = (value: number | undefined) => {
    setTargetProgress(getTargetProgressOnAmountChange(value));
  };

  const onTypeChange = (value: any) => {
    if (value === goalType.NUMBER) {
      onAmountChange(form.getFieldValue('amount'));
    }
    if (value === goalType.CHECKLIST) {
      onAmountChange(checklist.length);
    }
  };

  const onAddChecklistItem = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const addItemInputName = 'checklistItem';
    const itemValue = form.getFieldValue(addItemInputName);
    if (itemValue.length > inputLength.checklistItem) {
      return;
    }
    onAmountChange(checklist.length + 1);
    setChecklist(
      checklist.concat({
        id: uuid(),
        label: itemValue,
        isChecked: false,
      })
    );
    resetAddItemInput();
    setAutoFocusAddItem(true);
  };

  const onPasteChecklistItem = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData && e.clipboardData.getData('text');
    const splitData = pasteData.split('\n');
    onAmountChange(checklist.length + splitData.length);
    if (splitData.length > 1) {
      setChecklist(
        checklist.concat(
          splitData.map((item) => ({
            id: uuid(),
            label: item,
            isChecked: false,
          }))
        )
      );
      setTimeout(resetAddItemInput, 0);
    }
  };

  const onRemoveChecklistItem = (id: string) => {
    onAmountChange(checklist.length - 1);
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
            onError(e);
          }
        }
      },
    });
  };

  return (
    <Spin spinning={isLoading} size="large">
      <Form
        {...formLayout}
        className="GoalForm"
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
        <Form.Item
          name="period"
          label="Period"
          extra={targetProgress >= 0 ? `Target: ${targetProgress} / day` : null}
        >
          <RangePicker onChange={onPeriodChange} />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select style={{ width: 120 }} onChange={onTypeChange}>
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
                    <InputNumber min={0} onChange={onAmountChange} />
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
                    <Form.Item {...noLabelLayout} data-testid="checklist-item">
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
                      autoFocus={autoFocusAddItem}
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
            className="u-margin-bottom-sm"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            data-testid="goal-submit"
          >
            {props.type.toUpperCase()}
          </Button>
          {props.type === 'save' && (
            <Button
              block
              className="u-margin-bottom-sm"
              danger
              loading={isLoading}
              onClick={onDeleteGoal}
              data-testid="goal-delete"
            >
              DELETE
            </Button>
          )}
          <Button block onClick={() => history.push('/')}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <ScrollButton />
    </Spin>
  );
};

export default GoalForm;
