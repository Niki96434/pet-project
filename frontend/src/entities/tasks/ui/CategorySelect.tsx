import type { CategoryType } from '../model/types';
import './CategorySelect.css';

interface CategorySelectProps {
    categories: readonly CategoryType[];
}

export default function CategorySelect({ categories }: CategorySelectProps) {
    return (
        <>
            <label htmlFor='select-category'>Category
                <select name='category' className='select-style' id='select-category' required form='task-form'>
                    {categories.map((category: string) => {
                        return <option key={category} value={category}>{category}</option>
                    })}
                </select>
            </label>
        </>
    )
}