import { useState, useEffect } from 'react'
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { register } from '../functions/users.functions';
import styles from '../css/register.module.css'
import inputStyles from '../css/input.module.css'
import { useThemeContext } from '../components/Theme';
import { getCountries } from '../functions/requests';
import { country } from '../types';

const Register = () => {
    const theme = useThemeContext()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('2000-01-01');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState(() => { return { text: '' } });
    const [country, setCountry] = useState('')
    const [interests, setInterests] = useState<string[]>([])
    const [availableCountries, setAvailabeCountries] = useState<country[]>([])

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthdate: birthdate,
        gender: gender,
        profilePictutre: '',
        country: country,
        interests: interests
    };

    useEffect(() => {
        getCountries(setAvailabeCountries)
    }, [])

    const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (e.target.checked) {
            setInterests((prevInterests) => [...prevInterests, value]);
        } else {
            setInterests((prevInterests) => prevInterests.filter((interest) => interest !== value));
        }
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
    };

    return (
        <div className={`${styles.container} ${theme.theme === 'dark' ? `${styles.dark} bg-black` : styles.light} py-10`}>

            <form className={styles.form}>
                <h1>Register</h1>
                <h2>Let's start the experience</h2>
                <Input labelText='Name' inputType='text' onChange={setFirstName} />
                <Input labelText='Last Name' inputType='text' onChange={setLastName} />
                <Input labelText='Email' inputType='email' onChange={setEmail} />
                <Input labelText='Password' inputType='password' onChange={setPassword} />
                <Input labelText='Birthdate' inputType='date' onChange={setBirthdate} defaultValue='2000-01-01' />
                <div className={inputStyles.container}>
                    <label htmlFor="">Country</label>
                    <select name="" placeholder='select your country' onChange={handleCountryChange}>
                        {availableCountries.map((c) => (
                            <option key={c.name.official} value={c.name.official}>{c.name.official}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col items-center gap-5 w-11/12'>
                    <label className='w-full'>Gender</label>
                    <div className='flex items-center gap-8 justify-center'>
                        <div className='flex flex-row-reverse items-center w-full gap-3'>
                            <label htmlFor="">Male</label>
                            <input type="radio" name="gender" value={'Male'} onChange={handleGenderChange}/>
                        </div>
                        <div className='flex flex-row-reverse items-center w-full gap-3'>
                            <label htmlFor="">Female</label>
                            <input type="radio" name="gender" value={'Female'} onChange={handleGenderChange}/>
                        </div>
                    </div>
                </div>
                <div className='w-11/12 flex flex-col items-center gap-3'>
                    <label className='w-full'>Interests</label>
                    <div className='grid grid-cols-3 w-full'>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={1} onChange={handleInterestsChange}/>
                            <label htmlFor="">Music</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={4} onChange={handleInterestsChange}/>
                            <label htmlFor="">Sports</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={6} onChange={handleInterestsChange}/>
                            <label htmlFor="">Travels</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={2} onChange={handleInterestsChange}/>
                            <label htmlFor="">Movies</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={5} onChange={handleInterestsChange}/>
                            <label htmlFor="">Art</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={7} onChange={handleInterestsChange}/>
                            <label htmlFor="">Animals</label>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" value={3} onChange={handleInterestsChange}/>
                            <label htmlFor="">Politics</label>
                        </div>
                    </div>
                </div>
                <button onClick={e => {
                    e.preventDefault();     
                    register(user, setMessage);
                    console.log(user)
                }}>sign up</button>
                <p>{message.text}</p>
                <p>Do you already have an account? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    )
}

export default Register