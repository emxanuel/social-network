import styles from '../css/messageMenu.module.css'
import { useThemeContext } from './Theme'

interface Props {
    id: string
}

const MessageMenu: React.FC<Props> = ({ id }) => {
    const theme = useThemeContext()
    return (
        <div id={id} className={`${styles.container} ${styles.notShow} ${styles.hidden} ${theme.theme === 'dark' ? styles.dark : styles.light}`}>
            <button className=''>Edit</button>
            <button className=''>Info</button>
            <button className=''>Forward</button>
            <button className=''>Delete</button>
        </div>
    )
}

export default MessageMenu