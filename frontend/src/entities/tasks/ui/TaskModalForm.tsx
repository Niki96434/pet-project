import FormInput from '../../../shared/ui/FormInput';
import CategorySelect from './CategorySelect';
import { Category, type FormDataType } from '../model/types';
import './TaskModalForm.css';
import React, { useState } from 'react';
import usePostTask from '../lib/hooks/usePostTask';

interface TaskModalFormProps {
    handleModal: () => void;
}

export default function TaskModalForm({ handleModal }: TaskModalFormProps) {

    const [formData, setFormData] = useState<FormDataType>({
        title: '',
        description: '',
        deadlineDate: '',
        category: 'Misc',
    });

    const { loadData, isLoading } = usePostTask(formData);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        loadData();
        handleModal();
    }

    function handleFormValue(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    if (isLoading) {
        return <div>Отправка формы...</div>
    }

    return (
        <form onSubmit={handleSubmit} method='POST' id='task-form' className='task-form-container' onClick={(e) => e.stopPropagation()}>
            <FormInput value={formData.title} handleInputValue={handleFormValue} placeholder={'Do my homework'} children={'Title'} name={'title'} />
            <FormInput value={formData.description} handleInputValue={handleFormValue} placeholder={'Prepare for the math test'} children={'Description'} name={'description'} />
            <CategorySelect value={formData.category} handleSelectCategory={handleFormValue} categories={Category} />
            {/* https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/getting-started для записи даты дедлайна*/}
            <div className='form-button-container'>
                <button type='reset' className='close-button' onClick={handleModal}>Cancel</button>
                <button type='submit' className='submit-button'>Add Task</button>
            </div>
        </form >
    )
}

