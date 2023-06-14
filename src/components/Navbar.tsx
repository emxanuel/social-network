import { useUserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from '../css/navbar.module.css'

const Navbar = () => {
    const user = useUserContext()
    const navigate = useNavigate();
    const Logged = () => {
        return (
            <nav className = {styles.navbar}>
                <div>
                    <h1>SN</h1>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div>
                    <p>{user.first_name}</p>
                    {/* <img src={user.profilePicture} alt="" /> */}
                    <p onClick={() => {
                        localStorage.clear()
                        window.location.reload()
                    }}>Log out</p>
                </div>
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