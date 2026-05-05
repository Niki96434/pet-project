import type { CategoryType } from '../model/types';
import './CategorySelect.css';
import type { RefCallBack } from 'react-hook-form';

interface CategorySelectProps {
    categories: readonly CategoryType[];
    ref: RefCallBack;
}

export function CategorySelect({ categories, ref, ...props }: CategorySelectProps) {
    return (
        <>
            <label htmlFor='select-category'>Category
                <select ref={ref} {...props} name='category' className='select-style' id='select-category' required form='task-form'>
                    {categories.map((category: string) => {
                        return <option key={category} value={category}>{category}</option>
                    })}
                </select>
            </label>
        </>
    )
}