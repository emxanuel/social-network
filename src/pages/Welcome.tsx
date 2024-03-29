import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/welcome.module.css'
import { useUserContext } from '../components/UserContext'
import { useThemeContext } from '../components/Theme';
import { useEffect } from 'react';

const Welcome = () => {
    const user = useUserContext();
    const theme = useThemeContext()
    const navigate = useNavigate();
    if (user.id !== 0) {
        useEffect(() => {
            navigate('/');
        }, [])
        
        return (
            <div className={`${styles.loggedContainer} ${theme.theme === 'dark' ? styles.dark : styles.light}`}>
                <Link to='/contacts'>
                    <i className={`fa-solid fa-users`} />
                    <p>My Contacts</p>
                </Link>
                <Link to='/search'>
                    <i className={`fa-solid fa-magnifying-glass`} />
                    <p>Find friends</p>
                </Link>
                <Link to='/requests'>
                    <i className={`fa-regular fa-eye`} />
                    <p>See Requests</p>
                </Link>
            </div>
        )
    } else {
        return (
            <div className={`${styles.container} ${theme.theme === 'dark' ? styles.dark : styles.light}`}>
                <div className={styles.text}>
                    <h1>Welcome to sn</h1>
                    <h2>Contact your friends by the fastest way</h2>
                </div>
                <Link to='/register'>create an account</Link>
                <Link to='/login'>im already have an account</Link>
            </div>
        )
    }

}

export default Welcome