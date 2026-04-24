import './HeaderTaskList.css';

interface HeaderTaskListProp {
    children: React.ReactNode;
    headerIcon: string;
    handleModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function HeaderTaskList({ children, headerIcon, handleModal }: HeaderTaskListProp) {
    return (
        <div className="header-task-list">
            <img src={headerIcon} className="header-img"></img>
            <p>{children}</p>
            <button className="plus-img" aria-label="Add task" onClick={handleModal} />
        </div >
    )
}