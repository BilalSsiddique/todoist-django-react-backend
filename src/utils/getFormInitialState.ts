import dateFormatter from "../utils/helper/dateFormatter";
const { formattedDate } = dateFormatter();
import { useGetListQuery } from "../redux/services/todos/todosApi";
import { selectToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const useFormInitialState = () => {
const token = useAppSelector(selectToken)
 const { data,isLoading ,error} = useGetListQuery(token);

  const formDataInitialState = {
    id: null,
    title: "",
    description: "",
    due_date: formattedDate,
    updated_at: "",
    created_at: "",
    is_Completed: false,
    priority: 1,
    list_id: !isLoading && !error && data[0]?.id,
    list_title: "work tasks",
  };

  return formDataInitialState;
};

export default useFormInitialState;
