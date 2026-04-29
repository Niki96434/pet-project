import { FormInput } from '../../../shared';
import CategorySelect from './CategorySelect';
import { Categories, type CategoryType, type UpdateTaskDto } from '../model/types';
import './EditTaskForm.css';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskApi } from '../api/taskApi';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useEditTaskStore } from '../model/store';
import { toaster } from './../../../shared/lib/ui/toaster';

interface TaskModalFormProps {
    handleModal: () => void;
}

export function EditTaskForm({ handleModal }: TaskModalFormProps) {

    const queryClient = useQueryClient();

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const taskId = useEditTaskStore((state) => state.taskId);

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateTaskDto }) => taskApi.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            handleModal();
            toaster.create({
                title: 'Задача успешно сохранилась',
                type: 'success'
            });
        },
        onError: () => {
            toaster.create({
                title: 'Задачу не удалось сохранить',
                type: 'error'
            })
        }
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
        updateTaskMutation.mutate({ id: taskId.toString(), data: freshFormData });
    }

    return (
        <form id='task-form' className='task-form-container' onSubmit={(e) => updateTaskFields(e)} onClick={(e) => e.stopPropagation()}>
            <FormInput placeholder={'Do my homework'} children={'Title'} name={'title'} />
            <FormInput placeholder={'Prepare for the math test'} children={'Description'} name={'description'} />
            <CategorySelect categories={Categories} />
            <DatePicker name={'deadlineDate'} selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
            <div className='form-button-container'>
                <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                <button type='submit' className='submit-button' disabled={updateTaskMutation.isPending}>Save task</button>
            </div>
        </form >
    )
}