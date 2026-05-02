import { FormInput } from '../../../shared';
import CategorySelect from './CategorySelect';
import { Categories, type TaskType, type UpdateTaskDto } from '../model/types';
import './EditTaskForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskApi } from '../api/taskApi';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useEditTaskStore, getTaskId } from '../model/store';
import { toaster } from './../../../shared/lib/ui/toaster';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';

interface EditFormProps {
    closeEditModal: () => void;
}

export function EditTaskForm({ closeEditModal }: EditFormProps) {

    const queryClient = useQueryClient();
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
        } : undefined,
        delayError: 500,
        mode: "onChange",
    }
    );

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateTaskDto }) => taskApi.updateTask(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            toaster.create({
                title: 'Задача успешно сохранилась',
                type: 'success'
            });
            closeEditModal();
        },
        onError: () => {
            toaster.create({
                title: 'Задачу не удалось сохранить',
                type: 'error'
            })
        }
    });

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
                <CategorySelect categories={Categories} {...register("category", { required: true })} />
                <Controller control={control} name='deadlineDate' render={({ field }) => {
                    return <DatePicker onChange={(date: Date | null) => field.onChange(date?.toLocaleDateString() ?? "")} value={field.value} onBlur={field.onBlur} />
                }} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={() => closeEditModal()}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={updateTaskMutation.isPending || !isValid}>Save task</button>
                </div>
            </form >
        </div>
    )
}