import React, { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import {
  IfilterCriteria,
  filterCriteriaInitialState,
} from "../../utils/types/type";

interface Ifilter {
  filterCriteria: IfilterCriteria;
  setFilterCriteria: React.Dispatch<React.SetStateAction<IfilterCriteria>>;
  home: boolean;
}

const FilterTodo: React.FC<Ifilter> = ({
  filterCriteria,
  setFilterCriteria,
  home,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("select an option");

  const handleFilter = (
    event: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const updatedCriteria = {
        ...filterCriteria,

        [name]: event.target.checked,
      };
      setFilterCriteria(updatedCriteria);
    } else if (name === "priority") {
      const updatedCriteria = { ...filterCriteria, [name]: +value };
      setFilterCriteria(updatedCriteria);
    } else {
      const updatedCriteria = { ...filterCriteria, [name]: value };
      setFilterCriteria(updatedCriteria);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  console.log("filterCriteria", filterCriteria);

  return (
    <div
      className={`flex  gap-5 top-28 items-end  absolute left-8 ${
        home ? "hidden" : ""
      } w-[50%]`}
    >
      {!isFilterOpen ? (
        <SlOptionsVertical
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="cursor-pointer"
          size={22}
        />
      ) : (
        <GrFormClose
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setFilterCriteria(filterCriteriaInitialState);
          }}
          className="cursor-pointer"
          size={22}
        />
      )}
      {isFilterOpen && (
        <div className="order-2 rounded-md w-20 flex gap-2">
          <select
            className="rounded-md outline-none p-0.5 bg-[#ADC4CE]"
            name="fields"
            id=""
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            <option value="select an option">Select an option</option>
            <option value="completed">Task completed</option>
            <option value="priority">Priority</option>
            <option value="due_date">Due Date</option>
          </select>

          {selectedOption === "completed" && (
            <div className="flex gap-1  rounded-md bg-[#ADC4CE]">
              <label htmlFor="completed " className="px-2">
                Status
              </label>
              <input
                className="  m-1 rounded-md outline-none  bg-[#ADC4CE]"
                type="checkbox"
                name="completed"
                id="completed"
                onChange={handleFilter}
                checked={filterCriteria.completed!}
              />
            </div>
          )}

          {selectedOption === "priority" && (
            <select
              className="rounded-md outline-none p-0.5 bg-[#ADC4CE]"
              name="priority"
              onChange={handleFilter}
              id=""
            >
              <option value={0}>Select priority</option>
              <option value={1}>High</option>
              <option value={2}>Low</option>
            </select>
          )}

          {selectedOption === "due_date" && (
            <div>
              <input
                className="rounded-md outline-none p-0.5 bg-[#ADC4CE]"
                type="date"
                id="due_date"
                name="due_date"
                onChange={handleFilter}
                value={filterCriteria.due_date}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterTodo;
