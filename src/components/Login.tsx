import React, { useState, useContext, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Alert } from 'antd';
import { Auth } from 'aws-amplify';
import ERROR from '../constants/error';
import AuthContext from '../contexts/AuthContext';

const Login: FunctionComponent<RouteComponentProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [, setIsAuthenticated] = useContext(AuthContext);

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
      props.history.push('/');
    } catch (e) {
      setLoginError(e.message);
      setIsLoading(false);
    }
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
          rules={[
            { required: true, message: ERROR.REQUIRED_PASSWORD },
            {
              pattern: new RegExp('^\\S{8,20}$'),
              message: ERROR.INVALID_PASSWORD,
            },
          ]}
          hasFeedback
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
