import type React from 'react';
import './FormInput.css';
import type { RefCallBack } from 'react-hook-form';

interface FormInputProps {
    children: React.ReactNode;
    placeholder: string;
    ref: RefCallBack;
    title: string;
}

export function FormInput({ children, placeholder, title, ref, ...props }: FormInputProps) {
    return (
        <>
            <label>{children}
                <input title={title} autoComplete='off' required {...props} ref={ref} type='text' form='task-form' placeholder={placeholder} className="form-input" />
            </label>
        </>
    )
}