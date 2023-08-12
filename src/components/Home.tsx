import React from 'react'
import Navbar from './Navbar'
import Contacts from '../pages/Contacts';
import { useThemeContext } from './Theme';
import style from '../css/home.module.css'

interface Props {
    Comp: React.ComponentType;
}

const Home: React.FC<Props> = ({ Comp }) => {
    const theme = useThemeContext()
    
    if (Notification.permission === 'default'){
        Notification.requestPermission()
    }
    
    return (
    <div className={`${style.container} ${theme === 'dark'? style.dark : style.light}`}>
        <Navbar />
        {Comp === Contacts? (
            <Contacts outChat/>
        ) : <Comp />}
    </div>
    )
}

export default Home