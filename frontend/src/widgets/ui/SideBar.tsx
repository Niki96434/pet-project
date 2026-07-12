import styles from './SideBar.module.css';
import icon from './../../../public/icons/base-icon.png';

export function SideBar() {
    return (
        <div className={styles.menu}>
            <img className={styles.logo} src={icon} alt='logo'></img>
        </div>
    )
}
