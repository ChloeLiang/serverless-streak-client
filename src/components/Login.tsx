import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'antd';
import { Auth } from 'aws-amplify';
import ERROR from '../constants/error';

const Login: FunctionComponent = () => {
  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { username: string; password: string; }
   */
  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      await Auth.signIn(username, password);
      // alert('Logged in');
    } catch (e) {
      // alert(e.message);
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
          <Button type="primary" block htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
