import React from 'react';
import {Form, Button, Input} from 'antd';
import {Link} from 'react-router-dom';

function Register() {
  return (
    <>
    <main className='App-header'>
        <section className='mw-500 text-center px-3'>
            <h1>Register With BookitNow</h1>
            <Form layout="vertical">
                
            <Form.Item
                    label="Full Name"
                    htmlFor="name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input
                    id='name'
                    placeholder='Please enter your name'
                    type='text'
                    />
                </Form.Item>
                
                <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: 'email', message: "Please enter a valid email" }
                    ]}
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
                        Register
                    </Button>
                </Form.Item>

                <div>
                    <p className='text-center'>
                        Already have an account?
                        <Link to='/login' className='text-primary'> Login</Link>
                    </p>
                </div>


            </Form>

        </section>
    </main>
    
    </>
  )
}

export default Register
