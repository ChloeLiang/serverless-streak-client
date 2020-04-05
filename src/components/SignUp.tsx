import React, { useState, useContext, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Auth } from 'aws-amplify';
import ERROR from '../constants/error';
import AuthContext from '../contexts/AuthContext';

const SignUp: FunctionComponent<RouteComponentProps> = (props) => {
  const [newUser, setNewUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [, setIsAuthenticated] = useContext(AuthContext);

  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { username: string; password: string; }
   */
  const onFinishSignUp = async (values: any) => {
    setIsLoading(true);
    setNewUser('test');
    setIsLoading(false);
  };

  const onFinishConfirmation = () => {
    setIsLoading(true);
  };

  const renderConfirmationForm = () => {
    return (
      <Row justify="center">
        <Col>
          <Form name="confirmation" onFinish={onFinishConfirmation}>
            <Form.Item
              label="Confirmation Code"
              name="confirmationCode"
              extra="Please check your email for the code."
              rules={[
                {
                  required: true,
                  message: ERROR.CONFIRMATION_CODE,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                data-testid="signUp-verify"
                loading={isLoading}
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Form
        name="signUp"
        onFinish={onFinishSignUp}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {signUpError && (
          <Row justify="end">
            <Col>
              <Alert message={signUpError} type="error" showIcon />
            </Col>
          </Row>
        )}

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: ERROR.REQUIRED_USERNAME },
            { type: 'email', message: ERROR.INVALID_USERNAME },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: ERROR.REQUIRED_PASSWORD },
            {
              pattern: new RegExp('^\\S{8,20}$'),
              message: ERROR.INVALID_PASSWORD,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: ERROR.REQUIRED_PASSWORD },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(ERROR.CONFIRM_PASSWORD);
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{ sm: { span: 24 }, md: { offset: 8, span: 16 } }}
        >
          <Button
            type="primary"
            block
            htmlType="submit"
            data-testid="signUp-submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className="SignUp">
      {newUser ? renderConfirmationForm() : renderSignUpForm()}
    </div>
  );
};

export default SignUp;
