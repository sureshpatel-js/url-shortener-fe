import { useEffect, useState } from "react";
import CourseTile from "../../../components/courseTile/CourseTile";
import "./Home.css";
import { Outlet, useNavigate } from "react-router-dom";
import { SIDEBAR_MENU_ITEMS } from "../../../appConstants";

import {  useDispatch } from 'react-redux';
import { base_url } from '../../../appConstants';
import axios from 'axios';
import { saveUserData } from "../../../redux/user/userActions";
import { NotificationManager } from "react-notifications"

const Home = (props) => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        email: ""
    });
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const { name, email } = user;
            setState({
                name,
                email
            })
        }
    }, [])
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    }
    const menuItemClicked = (url) => {
        navigate(url);
        toggleSidebar();
    }

    useEffect(() => {
      axios.get(`${base_url}user`, {
        headers: {
          token
        }
      }).then(function (response) {
        const { user } = response.data.data;
        dispatch(saveUserData(user));
        setTimeout(() => {
            navigate("/home/links");  
        }, 1000);
      }).catch(function (error) {
        console.log(error);
        NotificationManager.error(`${error.response.data.data.message} Please Login.`, 'Error', 2000);
        navigate("/login");
      });
    },[])

    const logout = () => {
        toggleSidebar();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    const personClick = () => {
        alert(`
        Name: ${state.name}
        Email: ${state.email}
        `)
    }

    return (
        <div className="home" >
            <div className="homeHeader" >
                <div className="homeHeaderLeft" >
                    <div onClick={toggleSidebar} >
                        <i className={`homeHeaderRightIcon bi ${sidebarOpen ? "bi-x-lg" : "bi-list"}`} ></i>
                    </div>
                </div>
                <div style={{ fontSize: 18, paddingRight: 16 }} >
                    Let's learn code
                </div>
                <div onClick={personClick} className="homeHeaderRight">
                    <i class="bi bi-person-circle"></i>
                </div>
            </div>
            <div className={`homeSidebar ${sidebarOpen ? "homeSidebarOpen" : "homeSidebarClose"}`} >
                <div className="homeSidebarElementContainer" >
                    {
                        SIDEBAR_MENU_ITEMS.map(el => {
                            return (
                                <div onClick={() => menuItemClicked(el.url)} className="homeSidebarElement" >
                                    {el.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="homeSidebarLogout" >
                    <span onClick={logout} >Logout</span>
                </div>
            </div>
            <div className="homeBody" >
                <Outlet />
            </div>
        </div>
    )
}
export default Home;