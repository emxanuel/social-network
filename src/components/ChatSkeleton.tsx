import { Skeleton } from '@mui/material'
import style from '../css/chat.module.css'
import { useThemeContext } from './Theme'

const ChatSkeleton = () => {
    const theme = useThemeContext()
    return (
        <div>
            {theme.theme === 'dark' ? (
                <div className={style.skeleton}>
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'40vw'} height={'30vh'} animation='wave' />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'30vw'} height={'30vh'} animation='wave' className={style.right} />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'20vw'} height={'40vh'} animation='wave' />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'50vw'} height={'40vh'} animation='wave' />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'20vw'} height={'40vh'} animation='wave' className={style.right} />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'20vw'} height={'60vh'} animation='wave' />
                    <Skeleton sx={{
                        bgcolor:'rgb(22,22,22)'
                    }} width={'20vw'} height={'60vh'} animation='wave' className={style.right} />
                </div>
            ) : (
                <div className={style.skeleton}>
                    <Skeleton width={'40vw'} height={'30vh'} animation='wave' />
                    <Skeleton width={'30vw'} height={'30vh'} animation='wave' className={style.right} />
                    <Skeleton width={'20vw'} height={'40vh'} animation='wave' />
                    <Skeleton width={'50vw'} height={'40vh'} animation='wave' />
                    <Skeleton width={'20vw'} height={'40vh'} animation='wave' className={style.right} />
                    <Skeleton width={'20vw'} height={'60vh'} animation='wave' />
                    <Skeleton width={'20vw'} height={'60vh'} animation='wave' className={style.right} />
                </div>
            )}
        </div>
    )
}

export default ChatSkeleton