import React, { Children, ReactNode, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons"
import {GetCurrentUser} from "../api/users";
import {setUser} from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import {ShowLoader, HideLoader} from "../redux/loaderSlice";
 
const ProtectedRoute = ({children} : {children : ReactNode}) => {
    const { user } = useSelector((state: { users: any }) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Header, Footer, Sider, Content } = Layout;

    const navItems =[
        {
            label: "Home",
            icon: React.createElement(HomeOutlined),
        },
        {
            label: `${user ? user.name : ""}`,
            icon: React.createElement(UserOutlined),
            children: [
                {
                    label: "My Profile",
                    icon: React.createElement(ProfileOutlined),
                    onclick: () => {
                        if (user.role === "admin") {
                            navigate("/admin");
                        }
                        else if (user.role === "partner") {
                            navigate("/partner");
                        }else {
                            navigate("/user");  
                        }

                    }
                },
                {
                    label: "Logout",
                    icon: React.createElement(LogoutOutlined),
                    onclick : () => {
                        localStorage.removeItem("token");
                       // dispatch({type: "LOGOUT"});
                        navigate("/login");
                        //window.location.reload();
                    }

                }
            ]
        }
    ]
    const getValidUser = async () => {
        try{
            dispatch(ShowLoader());
            const response = await GetCurrentUser();
            console.log("Get Current User Response", response);
            dispatch(HideLoader());
            if (response && typeof response === "object" && "data" in response) {
                dispatch(setUser((response as { data: any }).data));
            }
        }catch (error) {
            dispatch(HideLoader());
            console.error("Error fetching user data:", error);
            message.error("Error fetching user data", error.message);
            localStorage.removeItem("token");
            navigate("/login");
        }
        dispatch(ShowLoader());
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser();

        }else {
            navigate("/login");
        }
    }, []);

    return (
        user && (
        `
        <Layout>
            <Header className="d-flex justify-content-between">
            <style={{position : sticky,
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            }}
            <h3 className="text-white m-0"> Book It Now</h3>
            <Menu theme="dark" 
            mode="horizontal" 
            items={navItems} 
            defaultSelectedKeys={["1"]} 
            className="d-flex 
            justify-content-end">
            </Menu>
            </Header>
            
        <Layout>
        `
        )
    );



};

    


export default ProtectedRoute;
