import { FormInput } from '../../../shared';
import CategorySelect from './CategorySelect';
import { Category, type CategoryType, type UpdateTaskDto } from '../model/types';
import './TaskModalForm.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskApi } from '../api/taskApi';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

interface TaskModalFormProps {
    taskId: string;
    handleModal: () => void;
}

export function EditTaskForm({ taskId, handleModal }: TaskModalFormProps) {

    const queryClient = useQueryClient();
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateTaskDto }) => taskApi.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            handleModal();
        },
        onError: (error) => { console.log(error) }
    });

    const updateTaskFields = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const freshFormData: UpdateTaskDto = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as CategoryType,
            deadlineDate: (formData.get('deadlineDate') ?? '')?.toString().split('/').join('-'),
        }
        updateTaskMutation.mutate({ id: taskId, data: freshFormData });
    }

    return (
        <div className='form-wrapper'>
            <form id='task-form' className='task-form-container' onSubmit={(e) => updateTaskFields(e)} onClick={(e) => e.stopPropagation()}>
                <FormInput placeholder={'Do my homework'} children={'Title'} name={'title'} />
                <FormInput placeholder={'Prepare for the math test'} children={'Description'} name={'description'} />
                <CategorySelect categories={Category} />
                <DatePicker name={'deadlineDate'} selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={updateTaskMutation.isPending}>Add task</button>
                </div>
            </form >
        </div>
    )
}