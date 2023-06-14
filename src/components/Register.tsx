import { useState } from 'react'
import Input from './Input';
import { Link } from 'react-router-dom';
import { register } from '../functions/users.functions';
import styles from '../css/register.module.css'

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('2000-01-01');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState(() => {return {text: ''}});

    let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthdate: birthdate,
        gender: gender,
        profilePictutre: ''
    };
    
    return (
    <div className={styles.container}>
        
        <form>
            <h1>Register</h1>
            <h2>Let's start the experience</h2>
            <Input labelText = 'Name' inputType = 'text' onChange = {setFirstName} />
            <Input labelText = 'Last Name' inputType = 'text' onChange = {setLastName} />
            <Input labelText = 'Email' inputType = 'text' onChange = {setEmail} />
            <Input labelText = 'Password' inputType = 'password' onChange = {setPassword} />
            <Input labelText = 'Birthdate' inputType = 'date' onChange = {setBirthdate} defaultValue = '2000-01-01'/>
            <Input labelText = 'Gender' inputType = 'text' onChange = {setGender} />
            <button onClick={e => {
                e.preventDefault();
                register(user, setMessage);
            }}>sign up</button> 
            <p>{message.text}</p>
            <p>Do you already have an account? <Link to='/login'>Log in</Link></p>
        </form>
    </div>
    )
}

export default Register