import {message} from "antd";
import { axiosInstance} from ".";

const API_URL = '/api/movies';

//Get All Movies --- GET
export const getAllMovies = async (values: any) => {
    try{
        const response = await axiosInstance.get(`${API_URL}/getAllMovies`, {params: values});
        console.log("Get All Movies Response:::::::", response);
        return response.data;
    }
    catch(error:any){
        console.error("Error fetching all Movies:", {message: error.message, response: error.response?.data, status: error?.response?.status});
        message.error("Error fetching all movies", error.message);
        throw error;
    }
}

// Get Movie by ID --- GET
export const getMovieById = async (_id : string) => {
    try{
        const response = await axiosInstance.get(`${API_URL}/getMovie/${_id}`);
        console.log("Get Movie By ID Response:::::::::", response);
        return response.data;

    }catch(error:any){
        console.error("error fetching Movie By ID", {message: error.message, response : error.response?.data, status: error?.response?.status});
        message.error("Error Fetching Movie By ID", error. message);
        throw error;
    }
}

//Create a new Movie --- POST
export  const addMovie = async (values: any) => {
    try{
        console.log("object:::::Before Calling API:::::",values);
        const response = await axiosInstance.post(`${API_URL}/addMovie`, values);
        console.log("Add Movie Response:::::::", response);
        message.success("Movie Added Successfully", );

    }catch(error:any){
        console.error("Error adding Movie:", { message: error.message, response: error.response?.data, status: error?.response?.status});
        message.error("Error adding Movie", error.message);
        throw error;
    }


}

// Delete Movie --- DELETE
export const deleteMovie = async (_id : string) => {
    try{
        const response = await axiosInstance.delete(`${API_URL}/deleteMovie/${_id}`);
        console.log("Delete Movie Response::::::::::", response);
        message.success("Movie Deleted Successfully");
        return response.data;
    }catch(error:any){
        console.error("Error deleting Movie:", {message: error.message, response: error.response?.data, status: error?.response?.status});
        message.error("Error deleting Movie", error.message);
        throw error;
    }
}
// Update Movie --- PUT
export const updateMovie = async (_id : string, values: any) => {
    try{
        const response = await axiosInstance.put(`${API_URL}/updateMovie/${_id}`, values);
        console.log("Update Movie Response::::::::::", response);
        message.success("Movie Updated Successfully");
        return response.data;
    }catch(error:any){
        console.error("Error updating Movie:", {message: error.message, response: error.response?.data, status: error?.response?.status});
        message.error("Error updating Movie", error.message);
        throw error;
    }
}



