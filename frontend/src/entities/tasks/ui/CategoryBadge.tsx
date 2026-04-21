import './CategoryBadge.css';
import type { TaskProp } from './../model/task';

interface CategoryBadgeProp {
    category: TaskProp['category'];
}

export default function CategoryBadge({ category }: CategoryBadgeProp) {
    let color: string;
    let backgroundColor: string;
    switch (category) {
        case 'Health':
            color = '#00B884';
            backgroundColor = '#00b8847d';
            break;
        case 'Life':
            color = '#49CCF9';
            backgroundColor = '#49cdf97d';
            break;
        case 'Work':
            color = '#5577FF';
            backgroundColor = '#5577ff86';
            break;
        case 'Study':
            color = '#D67AB1';
            backgroundColor = '#E2A3C7';
            break;
        case 'Misc':
            color = '#7B68EE';
            backgroundColor = '#7c68ee90';
            break;
        default:
            color = '#000';
            backgroundColor = '#ccc';
            break;
    }
    return (
        <div className="badge" style={{ backgroundColor: backgroundColor, color: color }}>{category}</div>
    )
}