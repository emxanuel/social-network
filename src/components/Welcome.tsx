import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/welcome.module.css'
import { useUserContext } from './UserContext'

const Welcome = () => {
    const user = useUserContext();
    const navigate = useNavigate();
    if (user.id !== 0){
        navigate('/');
        return (
            <Link to='/contacts'>My Contacts</Link>
        )
    }else{
        return (
            <div className={styles.container}>
                <div className={styles.text}>
                    <h1>welcome to sn</h1>
                    <h2>Contact your friends by the fastest way</h2>
                </div>
                <Link to='/register'>create an account</Link>
                <Link to='/login'>im already have an account</Link>
            </div>
            )
    }
    
}

export default Welcome