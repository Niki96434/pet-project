import { FormInput, SelectField } from "../../../shared/ui/index.ts";
import {
  taskApi,
  Categories,
  type Task,
  type UpdateTaskDto,
} from "../../../entities/tasks/index.ts";
import { useTaskModalStore } from "../../../entities/tasks/model/useTaskModalStore.ts";
import "./EditTaskForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { useEditTaskMutation } from "../model/useEditTaskMutation.ts";
import { handleDate } from "./../model/utils.ts";

interface EditFormProps {
  closeEditModal: () => void;
}

export function EditTaskForm({ closeEditModal }: EditFormProps) {
  const id = useTaskModalStore().taskId;

  const defaultTask: UpdateTaskDto = {
    title: "",
    description: "",
    category: "Misc",
    deadline_date: "",
    status: "Not completed",
  };

  const { data: task = defaultTask, isLoading } = useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => taskApi.getTaskById(id.toString()),
    retry: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<UpdateTaskDto>({
    values: {
      title: task.title,
      description: task.description || "",
      category: task.category,
      deadline_date: task.deadline_date,
      status: task.status,
    },
    delayError: 500,
    mode: "onChange",
  });

  const { updateTaskMutation } = useEditTaskMutation({ closeEditModal });

  const onSubmit: SubmitHandler<UpdateTaskDto> = (data) => {
    updateTaskMutation.mutate({ id: id.toString(), data: data });
  };

  if (isLoading) {
    return <div>Загрузка..</div>;
  }

  return (
    <div className="edit-form-wrapper">
      <form
        id="task-form"
        className="edit-task-form-container"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="edit-form-title">Edit task</h1>
        <FormInput
          placeholder={" Do my homework"}
          children={""}
          {...register("title", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
        />
        <div className="error-hint">
          {errors.title && `* ${errors.title?.message}`}
        </div>
        <FormInput
          placeholder={" Prepare for the math test"}
          children={""}
          {...register("description", {
            required: "Описание должно быть заполнено",
          })}
        />
        <div className="edit-error-hint">
          {errors.description && `* ${errors.description?.message}`}
        </div>
        <SelectField
          options={Categories}
          selectName={"category"}
          {...register("category", { required: true })}
        >
          Categories
        </SelectField>
        <Controller
          control={control}
          name="deadline_date"
          render={({ field }) => {
            return (
              <DatePicker
                onChange={(date: Date | null) =>
                  field.onChange(handleDate(date))
                }
                value={field.value}
                onBlur={field.onBlur}
              />
            );
          }}
        />
        <div className="edit-form-button-container">
          <button
            type="button"
            className="edit-close-button"
            onClick={closeEditModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="edit-submit-button"
            disabled={updateTaskMutation.isPending || !isValid}
          >
            Save task
          </button>
        </div>
      </form>
    </div>
  );
}
