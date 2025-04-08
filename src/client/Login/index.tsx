import React from 'react';
import {Form, Button, Input, App} from 'antd';
import {Link} from 'react-router-dom';
import FormItem from 'antd/es/form/FormItem';
//import '../../App.css';

function Login() {
  return (
    <>
    <main className='App-header'>
        <section className='mw-500 text-center px-3'>
            <h1>Login to BookitNow</h1>
            <Form layout="vertical">
                <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    rules={[{ required: true, message: "Please enter your email" }]}
                >
                    <Input
                    id='email'
                    placeholder='Please enter your email'
                    type='email'
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    htmlFor="password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input
                    id='text'
                    placeholder='Please enter your password'
                    type='password'
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                    className='d-block' 
                    type="primary" 
                    htmlType="submit"
                    block
                    style={{ fontSize: '1.2rem', fontWeight:'600' }}>
                        Login
                    </Button>
                </Form.Item>

                <div>
                    <p className='text-center'>
                        Don't have an account? 
                        <Link to='/register' className='text-primary'> Register</Link>
                    </p>
                </div>


            </Form>

        </section>
    </main>
    
    </>
  )
}

export default Login
