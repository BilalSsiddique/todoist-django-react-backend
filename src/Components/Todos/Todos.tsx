import { toast } from "react-toastify";
import AddTodo from "./AddTodo";
import ShowTodo from "./ShowTodo";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetListQuery,
} from "../../redux/services/todos/todosApi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectToken } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {} from "../../redux/services/todos/todosApi";
import { MdAdd, MdClose } from "react-icons/md";

import {
  setIsEditTodo,
  setIsTodoOpen,
  selectTodoOpen,
  selectTodoEdit,
  setFormData,
  selectFormData,
} from "../../redux/features/todo/todoSlice";
import useFormInitialState from "../../utils/getFormInitialState";

const Todos = ({ home }: { home: boolean }) => {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const token = useAppSelector(selectToken);
  const isTodoOpen = useAppSelector(selectTodoOpen);
  const isEditTodo = useAppSelector(selectTodoEdit);
  const formData = useAppSelector(selectFormData);
  const { data } = useGetListQuery(token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formDataInitialState = useFormInitialState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      console.log("name", name, [name], checked);
      dispatch(setFormData({ ...formData, [name]: checked }));
    } else {
      dispatch(setFormData({ ...formData, [name]: value }));
    }
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log("formdata at handleSubmit", formData);
    createTask({ token, formData })
      .unwrap()
      .then((res) => {
        console.log("res", res);
        toast.success(res.message);
        navigate(0);
      })
      .catch((err) => {
        for (const key in err.data) {
          toast.error(key + "," + err.data[key][0]);
        }
      });
  };

  const handleAddToggle = () => {
    dispatch(setFormData({ ...formDataInitialState }));
    dispatch(setIsTodoOpen(!isTodoOpen));
    dispatch(setIsEditTodo(false));
  };

  const handleUpdate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    updateTask({ token, formData })
      .unwrap()
      .then((data) => {
        navigate(0);
        toast.success(data[0]);
      })
      .catch((err) => {
        for (const key in err.data) {
          toast.error(key + "," + err.data[key][0]);
        }
      });
  };

  return (
    <>
      {isTodoOpen ? (
        <div
          className={`rounded-full bg-color absolute sm:p-1 shrink-0 z-40 cursor-pointer ${
            isTodoOpen ? "top-[10%]" : "top-[25%]"
          }  sm:top-[20%]   right-[4%] shadow-2xl`}
        >
          <MdClose
            onClick={() => dispatch(setIsTodoOpen(!isTodoOpen))}
            size={45}
            color="white"
          />
        </div>
      ) : (
        !home && (
          <div className="rounded-full bg-color absolute sm:p-1 shrink-0 z-40 cursor-pointer top-[25%] sm:top-[20%]  right-[4%]  shadow-2xl">
            <MdAdd onClick={handleAddToggle} size={45} color="white" />
          </div>
        )
      )}
      <ShowTodo home={home} />
      <div className={`${isTodoOpen && !isEditTodo && "p-7 overflow-hidden"}`}>
        {!home && isTodoOpen && !isEditTodo && (
          <AddTodo
            listData={data}
            buttonTitle="Add"
            formData={formData}
            isTodoOpen={isTodoOpen}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        {isEditTodo && isTodoOpen && (
          <AddTodo
            listData={data}
            buttonTitle="Update"
            formData={formData}
            isTodoOpen={isEditTodo}
            handleChange={handleChange}
            handleSubmit={handleUpdate}
          />
        )}
      </div>
    </>
  );
};

export default Todos;
