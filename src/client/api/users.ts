import { message } from "antd";
import { axiosInstance } from ".";

//Register New User

export const registerUser = async (values: any) => {
    try{
        console.log("Registering User:::::Before Calling API:::::",values);
        const response = await axiosInstance.post('/api/users/register', values);
        
        console.log("Register User Response:::::::", response);
        return response.data;

    }catch (error:any) {
        console.error("Error registering user:", { message: error.message, response: error.response?.data, status: error?.response?.status });

        throw error;
    }
};

export const loginUser = async (userData) => {
    try{
        const response = await axiosInstance.post('/api/users/login', userData);
        return response.data;

    }catch(error){
        console.error("Error logging in User", error);
        throw error;

    }

};

export const GetCurrentUser = async () => {
    try{
        const response = await axiosInstance.get('/api/users/get-current-user');
        return response.data;
    }catch(error){
        console.error("Error fetching current user", error);
        throw error;
    }


}