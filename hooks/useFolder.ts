import { User } from "./../models/user";
import { Folder } from "./../models/folder";
import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { mutate } from "swr";

export interface FolderValuesForm {
  name: string;
  user: number;
}
const schema = yup.object().shape({
  name: yup.string().required(),
  user: yup.number().nullable(),
});
export const useFolderForm = ({
  initialData,
  user,
  handleClose,
}: {
  initialData: Folder;
  user: User;
  handleClose: () => void;
}) => {
  console.log("lo que llega al hook", initialData);
  const hookform = useForm<FolderValuesForm>({
    defaultValues: initialData,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback(
    async (data) => {
      try {
        console.log("holiss", initialData);
        console.log("chaucito", data);

        await axios.post(`${process.env.api}/folder`, {
          ...data,
          user: user.id,
        });
        mutate(`${process.env.api}/folders/11`);
        handleClose();
      } catch (e) {
        console.log(e);
      }
    },
    [initialData, user]
  );
  const submitHandler = hookform.handleSubmit(onSubmit);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`${process.env.api}/folder/${initialData.id}`);
      mutate(`${process.env.api}/folders/11`);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return {
    ...hookform,
    submitHandler,
    onSubmit,
    onDelete,
  };
};
