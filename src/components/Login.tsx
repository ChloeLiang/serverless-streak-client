import React, { FunctionComponent } from 'react';
import { Form, Input, Button } from 'antd';

const Login: FunctionComponent = () => {
  /**
   * TODO Currently it's not able to define the type of values.
   * @param values { username: string; password: string; }
   */
  const onFinish = (values: any) => {
    console.log('Success', values);
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
            { required: true, message: 'Username is required' },
            { type: 'email', message: 'Username must be a valid email' },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Password is required' },
            {
              pattern: new RegExp('^\\S{8,20}$'),
              message:
                'Password must be at least 8 and not more than 20 non-whitespace characters.',
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
