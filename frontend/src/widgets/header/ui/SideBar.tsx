import { NavLink } from "react-router";
import dashboardIcon from './../../../assets/dashboard.svg?url';
import styles from './SideBar.module.css';

export function SideBar() {
    return (
        <div className={styles.menu}>
            <NavLink to='/home'>
                <img className={styles.homeIcon} src={dashboardIcon} alt='dashboard-icon' loading="lazy" />
            </NavLink>
        </div>
    )
}