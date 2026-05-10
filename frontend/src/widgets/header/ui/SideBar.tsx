import { NavLink } from "react-router";
import dashboardIcon from './../../../assets/dashboard.svg?url';
import './SideBar.css';

interface SideBarProps {
    isActive: boolean;
}
export function SideBar({ isActive }: SideBarProps) {
    return (
        <div className={isActive ? 'active menu' : 'menu'}>
            <NavLink to='/'>
                <img className="dashboard-icon" src={dashboardIcon} alt='dashboard-icon' loading="lazy" />
            </NavLink>
        </div>
    )
}