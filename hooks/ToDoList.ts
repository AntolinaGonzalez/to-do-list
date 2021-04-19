import useSWR from "swr";

const fetcher = (path) => fetch(path).then((res) => res.json());
export const useFetchData = () => {
  const { data, error } = useSWR(`${process.env.api}/user/11`, fetcher);
  const { data: dataTask, error: errorTask } = useSWR(
    `${process.env.api}/tasks/11`,
    fetcher
  );
  let FolderTasks = [];

  const { data: folder, error: errorFolder } = useSWR(
    `${process.env.api}/folders/11`,
    fetcher
  );
  folder &&
    folder.map((f) => {
      FolderTasks.push({
        ...f,
        tasks: dataTask && dataTask.filter((t) => t.folder === f.id),
      });
    });
  const { data: generalTask, error: generalTaskError } = useSWR(
    `${process.env.api}/tasks/folder/0`,
    fetcher
  );
  
  return {
    user: data,
    generalTask: {
      id: 0,
      name: "General",
      tasks: generalTask,
    },
    folders: FolderTasks,
    loading: !!!generalTask
  };
};
