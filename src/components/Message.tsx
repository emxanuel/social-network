import styles from '../css/messages.module.css'
import { toggleShowElement } from '../functions/elements'
import { useThemeContext } from './Theme'
import MessageMenu from './MessageMenu'
import menuStyles from '../css/messageMenu.module.css'

export type message = {
    id: number,
    sender: number,
    recipient: number,
    content: string,
    date_sent: string
}

interface Props {
    info: message
    className: CSSModuleClasses[string]
}

const Message: React.FC<Props> = ({ className, info }) => {
    const theme = useThemeContext()
    const date = new Date(info.date_sent).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    return (
        <button className={styles.container}>
            <div className={`${styles.message} ${className} ${theme === 'dark' ? styles.dark : styles.light}`}>
                <p className={styles.content}>{info.content}</p>
                <p className={styles.date}>{date}</p>
            </div>
            <MessageMenu />
        </button>
    )
}

export default Message