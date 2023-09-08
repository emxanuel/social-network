const sendNotification = (message: string) => {
    if(Notification.permission === 'granted'){
        new Notification('New notification', {
            body: message,
        })
    }
}

export {sendNotification}