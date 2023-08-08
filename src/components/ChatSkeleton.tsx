import { Skeleton } from '@mui/material'
import style from '../css/chat.module.css'

const ChatSkeleton = () => {
    return (
        <div className={style.skeleton}>
            <Skeleton width={'40vw'} height={'30vh'} animation='wave' />
            <Skeleton width={'30vw'} height={'30vh'} animation='wave' className={style.right}/>
            <Skeleton width={'20vw'} height={'40vh'} animation='wave' />
            <Skeleton width={'50vw'} height={'40vh'} animation='wave' />
            <Skeleton width={'20vw'} height={'40vh'} animation='wave' className={style.right}/>
            <Skeleton width={'20vw'} height={'60vh'} animation='wave' />
            <Skeleton width={'20vw'} height={'60vh'} animation='wave' className={style.right}/>
        </div>
    )
}

export default ChatSkeleton