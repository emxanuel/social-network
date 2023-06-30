import {useState} from 'react'
import styles from '../css/search.module.css'
import { UserData, useUserContext } from './UserContext'
import { searchUsers } from '../functions/users.functions'
import { useNavigate } from 'react-router-dom'

const SearchUsers = () => {
    const navigate = useNavigate();
    const user = useUserContext();
    const [results, setResults] = useState<UserData[]>([{
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        profile_picture: "",
        is_active: false
    }])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <i className={`fa-solid fa-arrow-left ${styles.arrowLeft} `} 
                onClick={() => window.history.back()} />
                <h1 className={styles.title}>Find new friends</h1>
            </div>
            <div className={styles.search}>
                <form>
                    <input type="text" placeholder='search users by name'
                    onChange={(e) => {searchUsers(e.target.value, user.id, setResults)}} />
                </form>
            </div>
            <div className={styles.results}>
                {results? (
                    results.map((result: UserData) => (
                        <div key={result.id} className={styles.result} onClick={() => {navigate(`/profile/${result.id}`)}}>
                            <h1 className={styles.name}>{result.first_name} {result.last_name}</h1>
                        </div>
                    ))
                ) : (
                    <h1>No results yet</h1>
                )}
            </div>
        </div>
    )
}

export default SearchUsers