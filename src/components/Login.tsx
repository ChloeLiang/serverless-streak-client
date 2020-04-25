import React, {
  useState,
  useEffect,
  useContext,
  FunctionComponent,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Auth } from 'aws-amplify';
import ERROR from '../constants/error';
import AuthContext from '../contexts/AuthContext';
import { inputLength } from '../constants/enum';
import { onError } from '../services/logger';
import { tagEvent } from '../services/analytics';

const Login: FunctionComponent<RouteComponentProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [, setIsAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    tagEvent({
      category: 'Login Page',
      action: 'User navigates to login page',
    });
  }, []);

  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { username: string; password: string; }
   */
  const onFinish = async (values: any) => {
    setIsLoading(true);
    const { username, password } = values;
    try {
      await Auth.signIn(username, password);
      setLoginError('');
      setIsAuthenticated(true);
    } catch (e) {
      setLoginError(e.message);
      onError(e);
      setIsLoading(false);
    }
    tagEvent({
      category: 'Login',
      action: 'User submits Login form',
    });
  };

  return (
    <div className="Login">
      <Form
        name="login"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {loginError && (
          <Row justify="end" gutter={[0, 16]}>
            <Col>
              <Alert message={loginError} type="error" showIcon />
            </Col>
          </Row>
        )}

        <Form.Item
          label="Username"
          name="username"
          hasFeedback
          rules={[
            { required: true, message: ERROR.REQUIRED_USERNAME },
            { type: 'email', message: ERROR.INVALID_USERNAME },
            {
              max: inputLength.username,
              message: `Maximum ${inputLength.username} characters`,
            },
          ]}
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
              max: inputLength.password,
              message: `Maximum ${inputLength.password} characters`,
            },
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
            data-testid="login-submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
