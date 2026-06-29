import { useTheme } from '../../../shared/lib/hooks/useTheme';
import styles from './ThemeToggler.module.css';

function ThemeToggler() {

    const { theme, setTheme } = useTheme();

    const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = e.target.checked ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <div className={styles.toggler}>
            <input id='theme-mode' className={`${styles.checkbox} ${styles[`checkbox_${theme}`]}`} type="checkbox" checked={theme === 'light'} onChange={handleChangeTheme}></input>
            <label htmlFor='theme-mode' className={`${styles.slider} ${styles[`slider_${theme}`]}`}></label>
        </div>
    )
}

export { ThemeToggler }