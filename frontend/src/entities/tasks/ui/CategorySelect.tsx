import type { CategoryType } from '../model/types';
import './CategorySelect.css';

interface CategorySelectProps {
    categories: readonly CategoryType[];
    handleSelectCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

export default function CategorySelect({ categories, handleSelectCategory, value }: CategorySelectProps) {
    return (
        <>
            <label htmlFor='select-category'>Category
                <select name='category' value={value} onChange={handleSelectCategory} className='select-style' id='select-category' required form='task-form'>
                    {categories.map((category: string) => {
                        return <option key={category} value={category}>{category}</option>
                    })}
                </select>
            </label>
        </>
    )
}