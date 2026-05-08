import type React from 'react';
import type { CategoryType, statusType } from '../../entities/tasks/model/types';
import './SelectField.css';
import type { RefCallBack } from 'react-hook-form';

interface SelectFieldProps {
    options: readonly CategoryType[] | readonly statusType[];
    ref: RefCallBack;
    children: React.ReactNode;
    selectName: string;
}

export function SelectField({ options, children, ref, selectName, ...props }: SelectFieldProps) {
    return (
        <>
            <label htmlFor='select-category'>{children}
                <select ref={ref} {...props} name={selectName} className='select-style' id='select-category' required form='task-form'>
                    {options.map((option: string) => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </label>
        </>
    )
}