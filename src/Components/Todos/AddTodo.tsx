import AddTodoForm from "./AddTodoForm";
import { IformData } from "../../utils/types/type";

const AddTodo = ({
  isTodoOpen,
  handleChange,
  handleSubmit,
  formData,
  buttonTitle,
  listData,
}: {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  isTodoOpen: boolean;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  formData: IformData;
  buttonTitle: string;
  listData: [{list_title:string,id:number}]
}) => {
  return (
    <div
      className={` ${
        isTodoOpen && "backdrop-blur-2xl"
      } w-full h-full top-0 right-0 left-0 mx-auto absolute z-30 overflow-hidden flex justify-center  items-center `}
    >
      <AddTodoForm
      listData={listData}
        buttonTitle={buttonTitle}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddTodo;
