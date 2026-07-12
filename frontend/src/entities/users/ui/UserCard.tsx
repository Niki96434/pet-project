import styles from './UserCard.module.css'

interface UserCardProps {
    initial: string;
}

function UserCard({ initial }: UserCardProps) {

    return (
        <div className={styles.container}>
            {initial}
        </div>
    )
}

export default UserCard