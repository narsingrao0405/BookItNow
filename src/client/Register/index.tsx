import React from 'react';
import {Form, Button, Input,message} from 'antd';
import {Link} from 'react-router-dom';
import{registerUser} from '../api/users';

function Register() {

    const onFinish = async (values: any) => {
        console.log("Registering User",values);
        // Call the registerUser function from the API
        try {
          console.log("Registering User:::::Inside the try:::::",values);
          const response = await registerUser(values) as { success: boolean; message: string };
          console.log("Register User Response", response);
          if (response.success) {
            message.success(response.message);
          } else {
            message.error(response.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      };


  return (
    <>

    <main className='App-header'>
        <section className='mw-500 text-center px-3'>
            <h1>Register With BookitNow</h1>
            <Form layout="vertical" onFinish={onFinish}>
                
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
