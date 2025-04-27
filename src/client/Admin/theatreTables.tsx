//import { useState } from "react";
import React, {useState, useEffect } from "react";
import {Table, message, Button} from "antd";
import {getAllTheatresForAdmin, updateTheatre} from "../api/theatre";
import {ShowLoader, HideLoader} from "../redux/loaderSlice";
import {useDispatch} from "react-redux";


const theatreTables: React.FC = () => {
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();

    const getTheatreData = async () => {
       try{

       }catch(error:any){
              console.log("Error in fetching theatres::::::::::", error);
              message.error("Error in fetching theatres");
       }

    }

    return(
        <>
        <div>
            <Table></Table>
        </div>
        </>
    )

};
export default theatreTables;
