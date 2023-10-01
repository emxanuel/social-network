import { Skeleton } from '@mui/material';
import styles from '../css/contact.module.css'
import { useThemeContext } from './Theme';

const ContactSkeleton = () => {
    const theme = useThemeContext()
    return (
        <div>
            {theme.theme === 'dark' ? (
                <div className={`${styles.skeleton}`}>
                    <Skeleton variant='rectangular' height={25} sx={{
                        bgcolor:'rgb(22,22,22)'
                    }}></Skeleton>
                    <div className={styles.skeletonMessage}>
                        <Skeleton variant='rectangular' width={200} height={10} sx={{
                        bgcolor:'rgb(22,22,22)'
                    }}></Skeleton>
                        <Skeleton variant='rectangular' width={100} height={10} sx={{
                        bgcolor:'rgb(22,22,22)'
                    }}></Skeleton>
                    </div>
                </div>
            ) : (
                <div className={`${styles.skeleton}`}>
                    <Skeleton variant='rectangular' height={25}></Skeleton>
                    <div className={styles.skeletonMessage}>
                        <Skeleton variant='rectangular' width={200} height={10}></Skeleton>
                        <Skeleton variant='rectangular' width={100} height={10}></Skeleton>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactSkeleton