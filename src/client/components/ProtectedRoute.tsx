import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { setUser } from "../redux/userSlice";
import { message, Layout, Menu, App } from "antd";
import { ShowLoader, HideLoader } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useSelector((state: { users?: { user: any } }) => state.users || { user: null });
    console.log("User in ProtectedRoute", user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Header, Footer  } = Layout;

    const navItems = [
        {
            key: "home",
            label: "Home",
            icon: React.createElement(HomeOutlined),
        },
        {
            key: "user",
            label: `${user ? user.name : ""}`,
            icon: React.createElement(UserOutlined),
            children: [
                {
                    key: "profile",
                    label: "My Profile",
                    icon: React.createElement(ProfileOutlined),
                    onClick: () => {
                        if (user.role === "admin") {
                            navigate("/admin");
                        } else if (user.role === "partner") {
                            navigate("/partner");
                        } else {
                            navigate("/user");
                        }
                    },
                },
                {
                    key: "logout",
                    label: "Logout",
                    icon: React.createElement(LogoutOutlined),
                    onClick: () => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    },
                },
            ],
        },
    ];

    const getValidUser = async () => {
        try {
            dispatch(ShowLoader());
            const response = await GetCurrentUser();
            console.log("Get Current User Response", response);
            dispatch(HideLoader());
            if (response && typeof response === "object" && "data" in response) {
                dispatch(setUser((response as { data: any }).data));
            }
        } catch (error) {
            dispatch(HideLoader());
            console.error("Error fetching user data:", error);
            message.error("Error fetching user data");
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1>BookitNow</h1>
            </div>
        <Layout>
            <Header className="d-flex  justify-content=between" style={{
                position: "sticky",
                top : 0,
                zIndex: 1,
                width: "100%",
                background: "#001529",
                display: "flex",
                alignItems: "center",
            }}>
                <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
            </Header>
            <div> {children}</div>
            <Footer style={{ textAlign: "center", background: "#001529", color: "#fff" }}>
                BookitNow ©2023 Created by K2 IT Solutions
            </Footer>
        </Layout>
        </>
    );
};

export default ProtectedRoute;
