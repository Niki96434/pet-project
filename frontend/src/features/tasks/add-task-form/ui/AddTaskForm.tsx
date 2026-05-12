import { FormInput } from '../../../../shared/ui';
import { SelectField } from '../../../../shared/ui/SelectField';
import { Categories } from '../../../../entities/tasks/model/types';
import './AddTaskForm.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from 'react-hook-form';
import { useCreateTaskMutation } from '../model/useCreateTaskMutation';
import { useForm } from 'react-hook-form';
import { type CreateTaskDto } from '../../../../entities/tasks';

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

    return (
        <div className='form-wrapper'>
            <form id='task-form' className='task-form-container' onSubmit={handleSubmit(createTask)} onClick={(e) => e.stopPropagation()}>
                <FormInput {...register('title', {
                    minLength: {
                        value: 5,
                        message: 'Минимум 5 символов'
                    }, required: 'Поле обязательно к заполнению'
                })} placeholder={'Do my homework'} children={'Title'} />
                <span title='error-hint' className='error-hint'>{errors.title && ('* ' + errors.title.message || '* Error')}</span>
                <FormInput {...register('description',
                    {
                        required: 'Описание должно быть заполнено',
                    }
                )} placeholder={'Prepare for the math test'} children={'Description'} />
                <span className='error-hint'> {errors.description && ('*' + errors.description.message || '* Error')}</span>
                <SelectField {...register('category')} selectName={'category'} options={Categories}>Categories</SelectField>
                <Controller name="deadlineDate" rules={{ required: true }} control={control} render={({ field }) => {
                    return <DatePicker onChange={(date: Date | null) => field.onChange(date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,
                        '0')}-${String(date.getDate()).padStart(2, '0')}` : "")} value={field.value} onBlur={field.onBlur} />
                }} />
                <div className='form-button-container'>
                    <button type='button' className='close-button' onClick={handleModal}>Cancel</button>
                    <button type='submit' className='submit-button' disabled={mutationCreateTask.isPending || !isValid}>Add task</button>
                </div>
            </form >
        </div>
    )
}