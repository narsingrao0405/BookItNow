import React from 'react';
import {Form, Button, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from '../api/users'

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try{
            const response = await loginUser(values) as { success: boolean; message: string; data?: string };
            if (response.success) {
                console.log(response.message);
                message.success(response.message);
                if (response.data) {
                    localStorage.setItem('token', response.data);
                } else {
                    console.error("Token is missing in the response.");
                    message.error("Token is missing in the response.");
                }
                navigate('/Home')
            }
            else{
                console.error(response.message);
                message.error(response.message);
                //App.message.error(response.message);
            }

        }catch(error){
            console.error("Error logging in user:", error);
            message.error("Error logging in user",error);
            //App.message.error("Error logging in user");
        }

    };
  return (
    
    <main className='App-header'>
        <section className='mw-500 text-center px-3'>
            <h1>Login to BookitNow</h1>
            <Form layout="vertical" onFinish={onFinish}>
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
    

  )
}

export default Login
