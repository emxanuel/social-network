import styles from '../css/messages.module.css'
import messageMeuStyles from '../css/messageMenu.module.css'
import { useThemeContext } from './Theme'
import MessageMenu from './MessageMenu'
import { toggleShowElement } from '../functions/elements'


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
        <button className={styles.container} onAuxClick={(e) => {
            e.preventDefault()
            console.log(`menu-${info.id}`)
            const element = document.getElementById(`menu-${info.id}`) as HTMLElement
            toggleShowElement(element, messageMeuStyles)
        }}>
            <div className={`${styles.message} ${className} ${theme.theme === 'dark' ? styles.dark : styles.light}`}>
                <p className={styles.content}>{info.content}</p>
                <p className={styles.date}>{date}</p>
            </div>
            <MessageMenu id={`menu-${info.id}`}/>
        </button> 
    )
}   

export default Message