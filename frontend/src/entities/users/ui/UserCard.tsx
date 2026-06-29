import { useUserStore, type UserState } from '../../../pages/login/model/useUserStore';
import styles from './UserCard.module.css'

function UserCard() {

    const username = useUserStore((state: UserState) => state.name);
    return (
        <div className={styles.container}>
            {username?.split('')[0]}
        </div>
    )
}

export default UserCard