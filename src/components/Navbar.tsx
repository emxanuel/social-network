import { useUserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from '../css/navbar.module.css'
import menuStyles from '../css/menu.module.css'
import Menu from './Menu'
import { useState } from 'react'
import { useThemeContext } from './Theme'

const Navbar = () => {
    const user = useUserContext()
    const theme = useThemeContext()
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true);

    const toggleNavbar = () => {
        const menu = document.getElementById('menu') as HTMLElement;
        toggle? menu.classList.add(menuStyles.active) : menu.classList.remove(menuStyles.active)

        // if (toggle){
        //     menu.style.display = 'flex'
        // }
        // else{
        //     menu.style.display = 'none'
        // }
    }
    const Logged = () => {
        return (
            <nav className = {`${styles.navbar} ${theme === 'dark'? styles.dark : styles.light}`}>
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
                    }}/>
                    <button className={styles.changeButton} onClick={() => {
                        theme === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
                        window.location.reload();
                    }}>
                        <i id = {styles.lightIcon} className={`fa-regular fa-sun`} />
                        <i id = {styles.darkIcon} className={`fa-regular fa-moon`}/>
                    </button>
                </div>
                <Menu />
            </nav>
        )
    }
    const Unlogged = () => {
        return(
            <nav className={`${styles.navbar} ${theme === 'dark'? styles.dark : styles.light}`}>
                <h1 className={styles.logo}><Link to='/'>SN</Link></h1>
                <p onClick={() => {
                    navigate('/login')
                }}>Login</p>
                <p onClick={() => {
                    navigate('/register')
                }}>sign in</p>
            </nav>
        )
    }
    return (
        user.id !== 0? <Logged />: <Unlogged />
    )
}

export default Navbar