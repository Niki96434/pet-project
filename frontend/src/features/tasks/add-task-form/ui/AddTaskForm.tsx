import { FormInput } from '../../../../shared/ui';
import { CategorySelect } from '../../../../entities/tasks';
import { Categories } from '../../../../entities/tasks/model/types';
import './AddTaskForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from 'react-hook-form';
import { useCreateTaskMutation } from '../model/useCreateTaskMutation';
import { useForm } from 'react-hook-form';
import { type CreateTaskDto } from '../../../../entities/tasks/model/types';

interface AddTaskFormProps {
    handleModal: () => void;
}

export function AddTaskForm({ handleModal }: AddTaskFormProps) {

    const { mutationCreateTask, createTask } = useCreateTaskMutation({ handleModal });

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
    // добавить утилиту для форматирования даты, сейчас она зависит от страны
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