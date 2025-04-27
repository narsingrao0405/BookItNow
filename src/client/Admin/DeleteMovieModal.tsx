import React from "react";
import { Modal, message } from "antd";
import {deleteMovie} from "../api/movie";
import { ShowLoader, HideLoader } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";

interface DeleteMovieResponse {
    success : boolean;
    message : string;
}

const deleteMovieModal = (
    {
        isDeleteModalOpen ,
        setIsDeleteModalOpen,
        selectedMovie,
        setSelectedMovie,
        getData
    }
) => {
    const dispatch  = useDispatch();

    const handleOk = async  () => {
        
        try{
            dispatch(ShowLoader());
            const movieId : string = selectedMovie._id;
            const response  = await deleteMovie (movieId );
            if (response?.success){
                message.success(response.message);
                getData();
                setIsDeleteModalOpen(false);
            }else{
                message.error(response?.message || "Something went wrong");

            }
            setSelectedMovie(null);
            setIsDeleteModalOpen(false);
            dispatch(HideLoader());


        }catch(error: any){
            console.error("Error deleting movie:", { message: error.message, response: error.response?.data, status: error?.response?.status });
            message.error("Error deleting movie", error.message);
        }
    };
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <Modal
            title="Delete Movie?"
            open={isDeleteModalOpen}
            onOk = {handleOk}
            onCancel = {handleCancel}
        >
            <p className="pt-3 fs-18"> Are you sure want to Delete this Movie?</p>
            <p className="pb-3 fs-18">
                This action cannot be undone. Once you delete this movie, it will be permanently removed from the database.

            </p>

        </Modal>
    );
};

export default deleteMovieModal;