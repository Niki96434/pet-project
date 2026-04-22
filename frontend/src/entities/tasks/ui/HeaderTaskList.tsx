import './HeaderTaskList.css';

interface HeaderTaskListProp {
    children: React.ReactNode;
    headerIcon: string;
}

export default function HeaderTaskList({ children, headerIcon }: HeaderTaskListProp) {
    return (
        <div className="header-task-list">
            <img src={headerIcon} className="header-img"></img>
            <p>{children}</p>
            <button className="plus-img" aria-label="Add task" />
        </div >
    )
}