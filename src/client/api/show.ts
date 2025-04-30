import {axiosInstance} from "./index";


const API_URL = "api/shows";
export const getShowById = async (payload: any) => {
    try{
        const response = await axiosInstance.get(
            `${API_URL}/get-show-by-id/${payload.showId}`
        );
        console.log("Get Show By ID Response::::::::::", response);
        return response.data;

    }catch(error:any){
        console.log("Unable to fetch the Show by ID", error);
        return error.message;
    }
}
