import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { GetCurrentUser } from "../api/users";
import { setUser } from "../redux/userSlice";
import { message, Layout, Menu } from "antd";
import { ShowLoader, HideLoader } from "../redux/loaderSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useSelector((state: { users: any }) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Header, Content } = Layout;

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
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["home"]}
                    items={navItems}
                    onClick={(item) => {
                        if (item.key === "home") {
                            navigate("/home");
                        } else if (item.key === "logout") {
                            localStorage.removeItem("token");
                            navigate("/login");
                        } else if (item.key === "profile") {
                            if (user.role === "admin") {
                                navigate("/admin");
                            } else if (user.role === "partner") {
                                navigate("/partner");
                            } else {
                                navigate("/user");
                            }
                        }
                    }}
                />
            </Header>
            <Content style={{ padding: "24px" }}>
                {children} {/* Render the protected content here */}
            </Content>
        </Layout>
    );
};

export default ProtectedRoute;
