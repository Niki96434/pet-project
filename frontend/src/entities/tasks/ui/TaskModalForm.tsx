import FormInput from '../../../shared/ui/FormInput';
import CategorySelect from './CategorySelect';
import { Category, type CategoryType, type CreateTaskDto } from '../model/types';
import './TaskModalForm.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskApi } from './../api/taskApi';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

interface TaskModalFormProps {
    handleModal: () => void;
}

export default function TaskModalForm({ handleModal }: TaskModalFormProps) {

    const queryClient = useQueryClient();
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const mutationCreateTask = useMutation({
        mutationFn: (newTask: CreateTaskDto) => taskApi.createTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            handleModal();
        },
        onError: (error) => { console.log(error) }
    });

    const createTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const freshFormData: CreateTaskDto = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as CategoryType,
            deadlineDate: (formData.get('deadlineDate') ?? '')?.toString().split('/').join('-'),
        }
        mutationCreateTask.mutate(freshFormData);
    }

    return (
        <div className='form-wrapper'>
            <form id='task-form' className='task-form-container' onSubmit={(e) => createTask(e)} onClick={(e) => e.stopPropagation()}>
                <FormInput placeholder={'Do my homework'} children={'Title'} name={'title'} />
                <FormInput placeholder={'Prepare for the math test'} children={'Description'} name={'description'} />
                <CategorySelect categories={Category} />
                <DatePicker name={'deadlineDate'} selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={mutationCreateTask.isPending}>Add task</button>
                </div>
            </form >
        </div>
    )
}