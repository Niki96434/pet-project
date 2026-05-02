import { NavLink } from "react-router";
import dashboardIcon from './../../../assets/dashboard.svg?url';
import todosIcon from './../../../assets/todos.svg';
import './SideBar.css';

export function SideBar() {
    return (
        <div className="sidebar-wrapper">
            <NavLink to='/'>
                <img className="dashboard-icon" src={dashboardIcon} alt='dashboard-icon' loading="lazy" />
            </NavLink>
            <NavLink to='/todos'>
                <img className="todos-icon" src={todosIcon} alt='todos-icon' />
            </NavLink>
        </div>
    )
}