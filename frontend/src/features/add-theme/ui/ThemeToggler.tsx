import { useTheme } from '../lib/useTheme';
import './ThemeToggler.css';

export type Theme = 'dark' | 'light';

export default function ThemeToggler() {

    const { theme, setTheme } = useTheme();

    const isLight = theme === 'light';

    const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(!e.target.checked ? 'light' : 'dark');
        localStorage.setItem('theme', theme);
    }

    return (
        <div className='theme-toggler'>
            <input id='theme-mode' className={`theme-toggler__checkbox theme-toggler__checkbox_${theme}`} type="checkbox" checked={isLight} onChange={handleChangeTheme}></input>
            <label htmlFor='theme-mode' className={`theme-toggler__slider theme-toggler__slider_${theme}`}></label>
        </div>
    )
}
