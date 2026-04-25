import FormInput from '../../../shared/ui/FormInput';
import CategorySelect from './CategorySelect';
import { Category, type CategoryType, type FormDataType } from '../model/types';
import './TaskModalForm.css';
import React from 'react';
import usePostTask from '../lib/hooks/usePostTask';


interface TaskModalFormProps {
    handleModal: () => void;
    setOptimisticTodo: (arg: FormDataType) => void;
    setTasks: React.Dispatch<React.SetStateAction<FormDataType[]>>;
}

export default function TaskModalForm({ handleModal, setOptimisticTodo, setTasks }: TaskModalFormProps) {

    const { loadData, isLoading } = usePostTask();

    async function handleSubmit(formData: FormData) {
        const freshFormData: FormDataType = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as CategoryType,
            deadlineDate: formData.get('deadlineDate') as string || '',
        }
        setOptimisticTodo(freshFormData);
        const newTask = await loadData(freshFormData);
        if (newTask) {
            setTasks((tasks) => [...tasks, newTask]);
            handleModal();
        }
    }

    return (
        <form action={handleSubmit} id='task-form' className='task-form-container' onClick={(e) => e.stopPropagation()}>
            <FormInput placeholder={'Do my homework'} children={'Title'} name={'title'} />
            <FormInput placeholder={'Prepare for the math test'} children={'Description'} name={'description'} />
            <CategorySelect categories={Category} />
            {/* https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/getting-started для записи даты дедлайна*/}
            <div className='form-button-container'>
                <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                <button type='submit' className='submit-button' disabled={isLoading}>{isLoading ? 'Adding...' : 'Add task'}</button>
            </div>
        </form >
    )
}