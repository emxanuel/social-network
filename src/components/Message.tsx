import React from 'react'
import styles from '../css/messages.module.css'

export type message = {
    id: number,
    sender: number,
    recipient: number,
    content: string,
    date_sent: string
}

const Message = (props: {content: string, date_sent: string, class: string}) => {
    return (
        <div className={`${styles.message} ${props.class}`}>
            <p>{props.content}</p>
            <p>{props.date_sent}</p>
        </div>
    )
}

export default Message