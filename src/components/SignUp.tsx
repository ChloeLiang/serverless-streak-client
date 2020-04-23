import React, { useState, useContext, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Auth } from 'aws-amplify';
import ERROR from '../constants/error';
import AuthContext from '../contexts/AuthContext';
import { inputLength } from '../constants/enum';

const SignUp: FunctionComponent<RouteComponentProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [, setIsAuthenticated] = useContext(AuthContext);

  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { username: string; password: string; confirmPassword: string; }
   */
  const onFinishSignUp = async (values: any) => {
    const { username, password } = values;
    setIsLoading(true);
    try {
      await Auth.signUp({
        username,
        password,
      });
      setIsLoading(false);
      setSignUpError('');
      setUsername(username);
      setPassword(password);
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        setUsername(username);
        setPassword(password);
        await Auth.resendSignUp(username);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setSignUpError(e.message);
      }
    }
  };

  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { confirmationCode: string; }
   */
  const onFinishConfirmation = async (values: any) => {
    const { confirmationCode } = values;
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      setSignUpError('');
      await Auth.signIn(username, password);
      setIsAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      setSignUpError(e.message);
      setIsLoading(false);
    }
  };

  const renderConfirmationForm = () => {
    return (
      <Row justify="center">
        <Col>
          <Form name="confirmation" onFinish={onFinishConfirmation}>
            {signUpError && (
              <Row justify="end" gutter={[0, 16]}>
                <Col>
                  <Alert message={signUpError} type="error" showIcon />
                </Col>
              </Row>
            )}
            <Form.Item
              label="Confirmation Code"
              name="confirmationCode"
              extra="Please check your email for the code."
              rules={[
                {
                  required: true,
                  message: ERROR.CONFIRMATION_CODE,
                },
                {
                  max: inputLength.confirmationCode,
                  message: `Maximum ${inputLength.confirmationCode} characters`,
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
          <Row justify="end" gutter={[0, 16]}>
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
            {
              max: inputLength.username,
              message: `Maximum ${inputLength.username} characters`,
            },
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
              pattern: new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]\\S{8,20}$'
              ),
              message: ERROR.INVALID_PASSWORD,
            },
            {
              max: inputLength.password,
              message: `Maximum ${inputLength.password} characters`,
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
            {
              max: inputLength.password,
              message: `Maximum ${inputLength.password} characters`,
            },
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
      {username ? renderConfirmationForm() : renderSignUpForm()}
    </div>
  );
};

export default SignUp;
