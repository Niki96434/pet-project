import './TaskListHeader.css';

interface TaskListHeaderProps {
    children: React.ReactNode;
    headerIcon: string;
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TaskListHeader({ children, headerIcon, handleModal }: TaskListHeaderProps) {
    return (
        <div className="header-task-list">
            <div className="title-header">
                <img src={headerIcon} className="header-img"></img>
                <p>{children}</p>
            </div>
            <button className="plus-img" aria-label="Add task" onClick={handleModal}></button>
        </div >
    )
}