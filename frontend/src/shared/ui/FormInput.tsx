import './FormInput.css';

interface FormInputProps {
    children: React.ReactNode;
    name: string;
    placeholder: string;
    value: string;
    handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({ children, name, placeholder, value, handleInputValue }: FormInputProps) {
    return (
        <>
            <label>{children}
                <input value={value} name={name} required type='text' form='task-form' placeholder={placeholder} className="form-input" onChange={handleInputValue} />
            </label>
        </>
    )
}