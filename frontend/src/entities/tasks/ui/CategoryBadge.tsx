import './CategoryBadge.css';
import type { TaskProp } from './../model/task';

interface CategoryBadgeProp {
    category: TaskProp['category'];
}

const categoryList = {
    Health: { color: '#00B884', backgroundColor: '#00b8847d', },
    Life: { color: '#49CCF9', backgroundColor: '#49cdf97d', },
    Work: { color: '#5577FF', backgroundColor: '#5577ff86', },
    Study: { color: '#D67AB1', backgroundColor: '#E2A3C7', },
    Misc: { color: '#7B68EE', backgroundColor: '#7c68ee90', }
}

export default function CategoryBadge({ category }: CategoryBadgeProp) {
    const { color, backgroundColor } = categoryList[category];
    return (
        <div className="badge" style={{ backgroundColor, color }}>{category}</div>
    )
}