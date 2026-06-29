import { NavLink } from "react-router";
import dashboardIcon from './../../../assets/dashboard.svg';
import styles from './SideBar.module.css';

export function SideBar() {
    return (
        // здесь что-то не так с NavLink, почитать об этом - https://reactrouter.com/api/components/NavLink#classname
        <div className={styles.menu}>
            <NavLink to='/'>
                <img className={styles.homeIcon} src={dashboardIcon} alt='dashboard-icon' />
            </NavLink>
        </div>
    )
}
