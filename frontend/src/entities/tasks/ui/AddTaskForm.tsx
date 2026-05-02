import { FormInput } from '../../../shared';
import CategorySelect from './CategorySelect';
import { Categories, type CreateTaskDto } from '../model/types';
import './AddTaskForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { taskApi } from '../api/taskApi';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { toaster } from "../../../shared/lib/ui/toaster";
import { useForm, Controller } from 'react-hook-form';

interface AddTaskFormProps {
    handleModal: () => void;
}

export function AddTaskForm({ handleModal }: AddTaskFormProps) {

    const queryClient = useQueryClient();

    const mutationCreateTask = useMutation({
        mutationFn: (newTask: CreateTaskDto) => taskApi.createTask(newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            handleModal();
            toaster.create({
                title: 'Задача успешно добавилась!',
                type: 'success',
            });
        },
        onError: () => {
            toaster.create({
                title: 'Задачу не удалось добавить',
                type: 'error',
            });
        }
    });

    const { register, handleSubmit, formState: { errors, isValid }, control } = useForm<CreateTaskDto>({
        values: {
            title: '',
            description: '',
            category: 'Misc',
            deadlineDate: '',
        },
        delayError: 500,
        mode: 'onChange'
    });
    const createTask = (data: CreateTaskDto) => {
        mutationCreateTask.mutate(data);
    }

    return (
        <div className='form-wrapper'>
            <form id='task-form' className='task-form-container' onSubmit={handleSubmit(createTask)} onClick={(e) => e.stopPropagation()}>
                <FormInput {...register('title', {
                    minLength: {
                        value: 5,
                        message: 'Минимум 5 символов'
                    }, required: 'Поле обязательно к заполнению'
                })} placeholder={'Do my homework'} children={'Title'} />
                {errors.title && (errors.title.message || 'Error')}
                <FormInput {...register('description',)} placeholder={'Prepare for the math test'} children={'Description'} />
                {errors.description && (errors.description.message || 'Error')}
                <CategorySelect {...register('category')} categories={Categories} />
                <Controller name="deadlineDate" rules={{ required: true }} control={control} render={({ field }) => {
                    return <DatePicker onChange={(date: Date | null) => field.onChange(date?.toLocaleDateString() ?? '')} value={field.value} onBlur={field.onBlur} />
                }} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={mutationCreateTask.isPending || !isValid}>Add task</button>
                </div>
            </form >
        </div>
    )
}