import './CategoryBadge.css';
import type { CategoryType } from '../model/types';

interface CategoryBadgeProps {
    category: CategoryType;
}

const categoryList = {
    Health: { color: '#00B884', backgroundColor: '#00b8847d', },
    Life: { color: '#49CCF9', backgroundColor: '#49cdf97d', },
    Work: { color: '#5577FF', backgroundColor: '#5577ff86', },
    Study: { color: '#D67AB1', backgroundColor: '#E2A3C7', },
    Misc: { color: '#7B68EE', backgroundColor: '#7c68ee90', }
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    const { color, backgroundColor } = categoryList[category] ?? categoryList.Misc;
    return (
        <div className="category-badge" style={{ backgroundColor, color }}>{category}</div>
    )
}