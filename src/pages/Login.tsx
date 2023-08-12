import { useState } from 'react'
import Input from '../components/Input'
import { login } from '../functions/users.functions';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/login.module.css'
import { useThemeContext } from '../components/Theme';

const Login = () => {
    const navigate = useNavigate()
    const theme = useThemeContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState(0);
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')

    const usr = {
        email: email,
        password: password
    }

    id.toString();
    user

    return (
        <div className={`${styles.container} ${theme === 'dark'? styles.dark : styles.light}`} >
            <form action="" className={styles.form}>
                <h1>Log in</h1>
                <h2>Welcome again</h2>
                <Input labelText='email' inputType='email' onChange={setEmail} labelClass={styles.labelEmail} />
                <Input labelText='password' inputType='password' onChange={setPassword} labelClass={styles.label} />
                <Link to='/'>
                    <button className={styles.button} onClick={async (e) => {
                        e.preventDefault();
                        if (await login(usr, setId, setUser, setMessage)){
                            navigate('/')
                            window.location.reload()
                        }
                    }}>login</button>
                </Link> 
                <p>{message}</p>
                <p>Don't have an account? <Link to='/register'>Create one</Link></p>
            </form>
        </div>
    )
}

export default Login