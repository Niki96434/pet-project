import './FormInput.css';

interface FormInputProps {
    children: React.ReactNode;
    name: string;
    placeholder: string;
}

export default function FormInput({ children, name, placeholder }: FormInputProps) {
    return (
        <>
            <label>{children}
                <input name={name} required type='text' form='task-form' placeholder={placeholder} className="form-input" />
            </label>
        </>
    )
}