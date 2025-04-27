import {axiosInstance} from "./index";

const API_URL = '/api/theatres';

export const addTheatre = async (payload : any) => {
    try{
        const response = await axiosInstance.post(
            `${API_URL}/add-theatre`,
            payload
        );
        return response.data;
    }catch(error:any){
        console.log("Error in Adding the Theatre::::::::", error);
        return error.response.data;
    }

};


export const getAllTheatres = async (ownerId : number) => {
    try{
        const response = await axiosInstance.get (
            `${API_URL}/get-all-theatres-by-owner/${ownerId}`

        );
        return response.data;

    } catch(error:any){
        console.log("Fetch all the theatres error::::::::::", error);
        return error.response.data;
    }
};

export const  getAllTheatresForAdmin = async () => {
    try{
        const response = await axiosInstance.get(
            `${API_URL}/get-all-theatres-for-admin`
        );
        return response.data;

    }catch (error: any){
        console.log("Error in Fetching all theatres for Admin::::::::::", error);
        return error.response.data;
    }

};

export const updateTheatre  = async (payload : any) => {
    try{
        const response = await axiosInstance.put(
            `${API_URL}/update-theatre`,
            payload
        );
        return response.data;
    } catch(error:any){
        console.log("Failed to update theatre::::::::::", error);
        return error.response.data;
    }
}

