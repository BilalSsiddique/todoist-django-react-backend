import {
  useGetTaskQuery,
  usePartialUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdMutation,
} from "../../redux/services/todos/todosApi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectToken } from "../../redux/features/auth/authSlice";
import { IformData, filterCriteriaInitialState } from "../../utils/types/type";
import generateRandomColor from "../../utils/generateRandomColor";
import generateDarkerColor from "../../utils/generateDarkerColor";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdPriorityHigh } from "react-icons/md";
import { BiSolidMessageSquareCheck } from "react-icons/bi";
import dateConvert from "../../utils/helper/dateConvert";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useGetPerformanceQuery } from "../../redux/services/todos/todosApi";

import {
  setIsEditTodo,
  setIsTodoOpen,
  selectTodoOpen,
  setFormData,
} from "../../redux/features/todo/todoSlice";
import FilterTodo from "./FilterTodo";
import { IfilterCriteria } from "../../utils/types/type";
import { taskMatchCriteria } from "../../utils/helper/filterCriteria";

const ShowTodo = ({ home }: { home: boolean }) => {
  const token = useAppSelector(selectToken);
  const isTodoOpen = useAppSelector(selectTodoOpen);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetTaskQuery({ token, page });
  const { refetch: performanceRefetch } = useGetPerformanceQuery({ token });
  const [updateTask] = usePartialUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useGetTaskByIdMutation();
  const [filterCriteria, setFilterCriteria] = useState<IfilterCriteria>(
    filterCriteriaInitialState
  );
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const filteredTasks = data?.data.filter((task: IformData) =>
    taskMatchCriteria(task, filterCriteria)
  );

  const handlePartialUpdate = async (idd: number | null) => {
    const updateTodoId = data.data.find((task: IformData) => task.id === idd);
    const { id, is_Completed } = updateTodoId;
    const updatedTodo = { id, is_Completed: !is_Completed };

    updateTask({ token, updatedTodo }) //partial update API call
      .unwrap()
      .then((data) => {
        toast.success(data[0]);
        refetch();
        performanceRefetch();
      })
      .catch((err) => {
        console.log("error", err);
        for (const key in err.data) {
          toast.error(key + "," + err.data[key][0]);
        }
      });
  };

  const handleDelete = async (id: number | null) => {
    deleteTask({ token, id })
      .unwrap()
      .then((data) => {
        toast.success(data[0]);
        refetch();
        performanceRefetch();
      })
      .catch((err) => {
        console.log("error", err);
        for (const key in err.data) {
          toast.error(key + "," + err.data[key][0]);
        }
      });
  };

  const handleEdit = async (id: number | null) => {
    dispatch(setIsEditTodo(true)),
      dispatch(setIsTodoOpen(true)),
      await editTask({ id, token })
        .unwrap()
        .then((data) => {
          const formData = data;
          const { due_date } = dateConvert(formData.due_date);
          dispatch(setFormData({ ...formData, due_date }));
          performanceRefetch();
        })
        .catch((err) => {
          console.log("error", err.error);
          for (const key in err.error.data) {
            toast.error(key + "," + err.error.data[key][0]);
          }
        });
  };

  const camelCase = (list_title: string) => {
    const wordLst = list_title.split(" ");
    let camelCaseWord = "";
    for (let i = 0; i < wordLst.length; i++) {
      camelCaseWord += wordLst[i][0].toUpperCase() + wordLst[i].slice(1) + " ";
    }
    return camelCaseWord.trim();
  };

  if (isLoading) {
    return <Loader />;
  }
  // if (error) {
  //   toast.error(error.data?.error);
  //   navigate(0);
  // }

  return (
    <div
      className={` ${
        isTodoOpen && "blur-3xl"
      } grid gap-4 overflow-hidden relative grid-cols-[repeat(auto-fill,minmax(200px,1fr))]  p-3 sm:px-7 pt-40 sm:pt-36 `}
    >
      {/* PAGINATION */}
      <Pagination page={page} setPage={setPage} data={data} />
      <FilterTodo
        home={home}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
      />
      {filteredTasks !== undefined &&
        filteredTasks !== null &&
        Array.isArray(filteredTasks) &&
        filteredTasks.length > 0 &&
        filteredTasks?.map((task: IformData, index: number) => {
          const bgColor = generateRandomColor(task.list_id);
          const textColor = generateDarkerColor(bgColor);
          const isCompleted = task.is_Completed;

          return (
            <div
              key={index}
              className="shadow-inner  gap-2 rounded-lg   flex w-full bg-[#F0F8FF]  flex-col"
            >
              <div className="flex pl-4 h-full justify-between gap-5 ">
                {/* LEFT */}
                <div className="flex flex-col  py-6 gap-3">
                  <div
                    style={{ backgroundColor: bgColor, color: textColor }}
                    className={` flex rounded-3xl gap-2 w-fit px-3 p-1`}
                  >
                    <p className="font-semibold text-[12px] sm:text-sm self-center">
                      {camelCase(task.list_title!)}
                    </p>
                    {task.priority === 1 ? (
                      <MdPriorityHigh color="#FF0000" size={20} />
                    ) : (
                      ""
                    )}
                  </div>

                  <h1
                    className={` ${
                      isCompleted && "line-through "
                    }  font-bold text-sm sm:text-base`}
                  >
                    {task.title}
                  </h1>
                  <p
                    className={` ${
                      isCompleted && "line-through "
                    } font-semibold text-[12px] sm:text-sm`}
                  >
                    {task.description}
                  </p>

                  <div className="lg:flex justify-between flex-wrap">
                    <p className="text-[8px] sm:text-[9px] text-green-800 font-bold self-end">
                      Last updated : {task.updated_at}
                    </p>
                    <p className="font-bold text-[9px] sm:text-[10px]  text-red-400">
                      Due : {task.due_date}
                    </p>
                  </div>
                </div>

                {/* RIGHT ACTIONS */}
                <div
                  style={{ backgroundColor: bgColor }}
                  className=" rounded-r-lg flex-col px-1 shadow-inner flex justify-around h-full "
                >
                  <BiSolidMessageSquareEdit
                    className="cursor-pointer"
                    onClick={() => handleEdit && handleEdit(task.id)}
                    color="#000000"
                    size={20}
                  />
                  <RiDeleteBin4Fill
                    onClick={() => handleDelete(task.id)}
                    color="#000000"
                    size={20}
                    className="cursor-pointer"
                  />

                  {task.is_Completed && (
                    <BiSolidMessageSquareCheck color="#000000" size={20} />
                  )}

                  <input
                    className="cursor-pointer"
                    checked={task.is_Completed}
                    onChange={() => handlePartialUpdate(task.id)}
                    type="checkbox"
                    name="is_completed"
                    id=""
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowTodo;
