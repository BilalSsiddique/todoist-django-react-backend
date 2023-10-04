import { useState } from "react";
import { BsListTask, BsCaretDownFill } from "react-icons/bs";
import AvailableTaskList from "./AvailableTaskList";
import DueDate from "./DueDate";
import IsComplete from "./IsComplete";
import Priority from "./Priority";
import { IformData } from "../../utils/types/type";

interface IAddForm {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  formData: IformData;
  buttonTitle: string;
  listData:[{list_title:string,id:number}]
}

const AddTodoForm: React.FC<IAddForm> = ({
  handleChange,
  handleSubmit,
  formData,
  listData,

  buttonTitle,
}) => {
  const [isExtend, setIsExTend] = useState(false);

  return (
    <div className="absolute left-0 right-0 mx-auto  flex flex-col items-center sm:w-2/4  p-2 rounded-2xl  bg-[#ADC4CE] ">
      <div className="flex items-center shadow-inner  w-full py-1 ">
        <BsListTask
          className={`bg-black h-full p-1 ${"rounded-l-2xl"}  shrink-0`}
          color="#ffffff"
          size={36}
        />
        <input
          className="w-full p-1.5 shadow-inner bg-[#F0F8FF]   outline-none"
          placeholder="Add..."
          type="text"
          name="title"
          id="task"
          value={formData.title}
          onChange={handleChange}
        />
        {!isExtend && (
          <button
            onClick={handleSubmit}
            className="bg-black border-r text-white font-bold   w-fit px-2 py-1.5"
          >
            {buttonTitle}
          </button>
        )}
        <button onClick={() => setIsExTend(!isExtend)}>
          <BsCaretDownFill
            className={`bg-black shadow-inner  h-full p-2 ${"rounded-r-2xl"} shrink-0`}
            color="#ffffff"
            size={36}
          />
        </button>
      </div>

      {/* IsExtend = true */}
      {isExtend && (
        <div className="w-full gap-2 justify-center   items-center flex-col flex  ">
          <textarea
            className="resize-none shadow-inner bg-[#F0F8FF]  p-5 rounded-lg w-full   outline-none"
            placeholder="Description..."
            name="description"
            id="descrition"
            rows={1}
            onChange={handleChange}
            value={formData.description}
          />
          <AvailableTaskList listData={listData} formData={formData} handleChange={handleChange} />
          <DueDate formData={formData} handleChange={handleChange} />
          <IsComplete formData={formData} handleChange={handleChange} />
          <Priority formData={formData} handleChange={handleChange} />
          <button
            onClick={handleSubmit}
            className="bg-black border border-[#212121] w-full shadow-inner rounded-2xl text-white font-bold  py-1.5"
          >
            {buttonTitle}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodoForm;
