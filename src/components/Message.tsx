import styles from '../css/messages.module.css'
import { useThemeContext } from './Theme'

export type message = {
    id: number,
    sender: number,
    recipient: number,
    content: string,
    date_sent: string
}

const Message = (props: {content: string, date_sent: string, class: string}) => {
    const theme = useThemeContext()
    return (
        <div className={`${styles.message} ${props.class} ${theme === 'dark'? styles.dark : styles.light}`}>
            <p>{props.content}</p>
            <p>{props.date_sent}</p>
        </div>
    )
}

export default Message