import { IformData } from "./Todos";

const Priority = ({
  handleChange,
  formData,
}: {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  formData: IformData;
}) => {
  const priority_lst = [
    { priority: "High", priorityId: 1 },
    { priority: "Low", priorityId: 2 },
  ];
  console.log(formData.priority, "prioroty");
  return (
    <div className="flex w-full ">
      <select
        onChange={handleChange}
        className="w-full  rounded-2xl shadow-inner px-2 border p-1.5 outline-none bg-[#F0F8FF] font-semibold"
        name="priority"
        id=""
      >
        {priority_lst.map((priority, index) => {
          
          return (
            <option
              selected={formData.priority === priority.priorityId}
              key={index}
              value={priority.priorityId}
            >
              {priority.priority}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Priority;
