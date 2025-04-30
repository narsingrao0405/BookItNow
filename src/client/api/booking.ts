import {axiosInstance} from "./index";

const API_URL = "api/bookings";

export const makePayment = async (token : any, amount : number) => {
    try{
        const response = await axiosInstance.post(
            `${API_URL}/make-payment`,{token, amount}
        );
        console.log("Payment Response::::::::::", response);
        return response.data;

    }catch(error:any){
        console.log("Failed to make payment", error);
        return error.message;
    }
};

export const bookShow = async (payload:any) => {
    try{
        const response = await axiosInstance.post(
            `${API_URL}/book-show`, payload
        );
        console.log("Book Show Response::::::::::", response);
        return response.data;

    }catch(error:any){
        console.log("Error in booking show::::::::::", error);
        return error.message;

    }

}

