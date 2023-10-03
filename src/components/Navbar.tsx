import { useUserContext } from './UserContext'
import { Link } from 'react-router-dom'
import styles from '../css/navbar.module.css'
import menuStyles from '../css/menu.module.css'
import Menu from './Menu'
import { useState } from 'react'
import { useThemeContext } from './Theme'

const Navbar = () => {
    const user = useUserContext()
    const { theme, toggleTheme } = useThemeContext()
    const [toggle, setToggle] = useState(true);

    const toggleNavbar = () => {
        const menu = document.getElementById('menu') as HTMLElement;
        toggle ? menu.classList.add(menuStyles.active) : menu.classList.remove(menuStyles.active)
    }

    const handleToggleTheme = () => {
        setTimeout(() => {
            toggleTheme()
        }, 0);
    }

    const Logged = () => {
        return (
            <nav className={`${styles.navbar} ${theme === 'dark' ? styles.dark : styles.light}`}>
                <div className={styles.iconContainer}>
                    <h1 className={styles.logo}><Link to='/'>SN</Link></h1>
                </div>
                <div className={styles.links}>
                    <Link to='/search'>
                        Search friends
                    </Link>
                    <Link to='/requests'>
                        Friends requests
                    </Link>
                    <Link to='/' onClick={() => {
                        localStorage.removeItem('User')
                        window.location.reload()
                    }}>Logout</Link>
                    <p>{user.first_name}</p>
                    {/* <img src={user.profilePicture} alt="" /> */}
                    <i className={`${styles.icon} ${styles.bars} fa-solid fa-bars`} onClick={async () => {
                        await setToggle(!toggle)
                        toggleNavbar()
                    }} />
                    <button className={styles.changeButton} onClick={handleToggleTheme}>
                        <i id={styles.lightIcon} className={`fa-regular fa-sun`} />
                        <i id={styles.darkIcon} className={`fa-regular fa-moon`} />
                    </button>
                </div>
                <Menu />
            </nav>
        )
    }
    const Unlogged = () => {
        return (
            <nav className={`${styles.navbar} ${theme === 'dark' ? styles.dark : styles.light}`}>
                <h1 className={styles.logo}><Link to='/'>SN</Link></h1>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Sign up</Link>
            </nav>
        )
    }
    return (
        user.id !== 0 ? <Logged /> : <Unlogged />
    )
}

export default Navbar