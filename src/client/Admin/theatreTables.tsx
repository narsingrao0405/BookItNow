//import { useState } from "react";
import React, {useState, useEffect } from "react";
import {Table, message, Button} from "antd";
import {getAllTheatresForAdmin, updateTheatre} from "../api/theatre";
import {ShowLoader, HideLoader} from "../redux/loaderSlice";
import {useDispatch} from "react-redux";


const TheatreTables =  () => {
    const [theatres, setTheatres] = useState([]);
    const dispatch = useDispatch();

    const getTheatreData = async () => {
       try{
        dispatch(ShowLoader());
        const response = await getAllTheatresForAdmin();
        if (response?.success){
            const allTheatres = response.data;
            setTheatres(
                allTheatres.map((theatre: any) => ({
                    ...theatre,
                    key: `theatre-${theatre._id}`,
                    name: theatre.name,
                    location: theatre.location,
                    owner: theatre.owner.name,
                    status: theatre.status,

                }))
            )
        } else {
            message.error(response?.message || "Something went wrong");
        }
        dispatch(HideLoader());
           

       }catch(error:any){
              console.log("Error in fetching theatres::::::::::", error);
              message.error("Error in fetching theatres", error.message);
       }

    useEffect(() => {
        getTheatreData();
    }, []);

       const handleStatusChange = async (theatreId : string) => {
        try{
            dispatch(ShowLoader());
            const values = {
                ...theatres,
                theatreId: theatreId,
                isActive : !theatres.isActive,
            };
            const response = await updateTheatre({values});
            if(response?.success){
                message.success("Theatre status updated successfully", response.message);
                getTheatreData();
            } else {
                message.error(response?.message || "Something went wrong");
            }
            dispatch(HideLoader());

        } catch(error:any){
            console.log("Error in updating theatre status::::::::::", error);
            message.error("Error in updating theatre status", error.message);
        }
       };

    const columns = [
        {
            title : "Theatre Name",
            dataIndex : "name",
            key : "name"
        },
        {
            titll: "Owner",
            dataIndex : "owner",
            key : "owner",
            render: (text, data) => {
                return data.owner && data.owner.name;
            },
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",

        },
        {
            title:"Email",
            dataIndex : "email",
            key: "email"
        },
        {
            title: "Status",
            dataIndex: "status",
            render : (status, data) => {
                if(data.IsActive){
                    return "Approved";
                }else {
                    return "Pending/Blocked";
                } 
            }
        },
        {
            title:"Action",
            dataIndex: "action",
            render : (text : any, data : any) => {
                return(
                    <div>
                        <Button type = "primary" onClick={() => handleStatusChange(data._id)}>
                            {data.isActive ? "Block" : "Unblock"}
                        </Button>
                    </div>
                );
            },
            }
        ];

   

    return(
        <>
        {theatres && theatres.length > 0 && (
          <Table dataSource={theatres} columns={columns} />
        )}
      </>
    );
};

};
export default TheatreTables;
