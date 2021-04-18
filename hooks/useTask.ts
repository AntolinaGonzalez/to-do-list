import { User } from "./../models/user";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { mutate } from "swr";
import { Task } from "../models/task";

export interface TaskValuesForm {
  title: string;
  priority: string;
  user: number;
  folder?: number;
}

export const useTaskForm = ({
  initialData,
  user,
  folder,
  handleClose,
}: {
  initialData: Task;
  user: User;
  folder: number;
  handleClose?: () => void;
}) => {
  const hookform = useForm<TaskValuesForm>({
    defaultValues: initialData,
    mode: "onBlur",
  });
  const [checked, setChecked] = useState<string[]>([]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        await axios.post(`${process.env.api}/task`, {
          ...data,
          priority: initialData.priority,
          user: user.id,
          folder: folder,
        });
        handleClose();
        mutate(`${process.env.api}/tasks/folder/0`);
        mutate(`${process.env.api}/tasks/11`);
      } catch (e) {
        console.log(e);
      }
    },
    [initialData, user]
  );
  const submitHandler = hookform.handleSubmit(onSubmit);
  const handleChangeChecked = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      await axios.put(`${process.env.api}/task`, {
        ...initialData,
        checked: !initialData.checked,
      });
      mutate(`${process.env.api}/tasks/11`);
      mutate(`${process.env.api}/tasks/folder/0`);
    } catch (e) {
      console.log(e);
    }
  };

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`${process.env.api}/task/${initialData.id}`);
      mutate(`${process.env.api}/tasks/folder/0`);
      mutate(`${process.env.api}/tasks/11`);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return {
    ...hookform,
    submitHandler,
    onSubmit,
    onDelete,
    handleChangeChecked,
  };
};
