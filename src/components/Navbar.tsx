import { useUserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from '../css/navbar.module.css'
import Menu from './Menu'
import { useState } from 'react'

const Navbar = () => {
    const user = useUserContext()
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(true);

    const toggleNavbar = () => {
        let menu = document.getElementById('menu') as HTMLElement;
        if (toggle){
            menu.style.display = 'flex'
        }
        else{
            menu.style.display = 'none'
        }
    }
    const Logged = () => {
        return (
            <nav className = {styles.navbar}>
                <div>
                    <h1 className={styles.logo}><Link to='/'>SN</Link></h1>
                </div>
                <div className={styles.links}>
                    <p>{user.first_name}</p>
                    {/* <img src={user.profilePicture} alt="" /> */}
                    <p onClick={() => {
                        localStorage.clear()
                        window.location.reload()
                    }}>Logout</p>
                    <i className={`${styles.icon} fa-solid fa-bars`} onClick={async () => {
                        await setToggle(!toggle)
                        console.log(!toggle)
                        toggleNavbar()
                    }}/>
                </div>
                <Menu />
            </nav>
        )
    }
    const Unlogged = () => {
        return(
            <nav className={styles.navbar}>
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