import { useState } from 'react'
import Input from './Input'
import { login } from '../functions/users.functions';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/login.module.css'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState(0);
    const [user, setUser] = useState({})

    const usr = {
        email: email,
        password: password
    }

    id.toString();
    user

    return (
        <div className={styles.container}>
            <form action="" className={styles.form}>
                <h1>Log in</h1>
                <h2>Welcome again</h2>
                <Input labelText='email' inputType='email' onChange={setEmail} labelClass={styles.labelEmail} />
                <Input labelText='password' inputType='password' onChange={setPassword} labelClass={styles.label} />
                <Link to='/'>
                    <button className={styles.button} onClick={async (e) => {
                        e.preventDefault();
                        if (await login(usr, setId, setUser)){
                            navigate('/')
                            window.location.reload()
                        }
                    }}>login</button>
                </Link> 
                <p>Don't have an account? <Link to='/register'>Create one</Link></p>
            </form>
        </div>
    )
}

export default Login