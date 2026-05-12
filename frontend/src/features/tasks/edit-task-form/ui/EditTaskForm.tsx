import { FormInput, SelectField } from '../../../../shared/ui';
import { taskApi, Categories, type TaskType, type UpdateTaskDto, Status } from './../../../../entities/tasks';
import { useEditTaskStore, getTaskId } from '../../../../entities/tasks/model/store';
import './EditTaskForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from '@tanstack/react-query';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useEditTaskMutation } from '../model/useEditTaskMutation';

interface EditFormProps {
    closeEditModal: () => void;
}

export function EditTaskForm({ closeEditModal }: EditFormProps) {

    const id = useEditTaskStore(getTaskId);

    const { data: task, isLoading } = useQuery<TaskType>({
        queryKey: ['todo', id],
        queryFn: () => taskApi.getTaskById(id.toString()),
        retry: 1,
    });

    const { register, handleSubmit, formState: { errors, isValid }, control } = useForm<UpdateTaskDto>({
        values: task ? {
            title: task.title || '',
            description: task.description || '',
            category: task.category || 'Misc',
            deadlineDate: task.deadlineDate || '',
            status: task.status || 'not_completed',
        } : undefined,
        delayError: 500,
        mode: 'onChange',
    }
    );

    const { updateTaskMutation } = useEditTaskMutation({ closeEditModal });

    const onSubmit: SubmitHandler<UpdateTaskDto> = (data) => {
        updateTaskMutation.mutate({ id: id.toString(), data: data });
    };
    if (isLoading) {
        return <div>Загрузка..</div>
    }

    return (
        <div className='form-wrapper'>
            <form id='task-form' className='task-form-container' onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
                <FormInput placeholder={' Do my homework'} children={'Title'} {...register("title", {
                    required: 'Поле обязательно к заполнению', minLength: {
                        value: 5,
                        message: 'Минимум 5 символов'
                    }
                })} />
                <div className='error-hint'>{errors.title && `* ${errors.title?.message}`}</div>
                <FormInput placeholder={' Prepare for the math test'} children={'Description'} {...register("description", {
                    required: 'Описание должно быть заполнено'
                })} />
                <div className='error-hint'>{errors.description && `* ${errors.description?.message}`}</div>
                <SelectField options={Categories} selectName={'category'}  {...register("category", { required: true })}>Categories</SelectField>
                <SelectField {...register('status')} selectName={'status'} options={Status}>Progress status</SelectField>
                <Controller control={control} name='deadlineDate' render={({ field }) => {
                    return <DatePicker onChange={(date: Date | null) => field.onChange(date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,
                        '0')}-${String(date.getDate()).padStart(2, '0')}` : "")} value={field.value} onBlur={field.onBlur} />
                }} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={() => closeEditModal()}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={updateTaskMutation.isPending || !isValid}>Save task</button>
                </div>
            </form >
        </div>
    )
}