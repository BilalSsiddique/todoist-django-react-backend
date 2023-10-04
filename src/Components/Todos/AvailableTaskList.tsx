import { IformData } from "../../utils/types/type";

const AvailableTaskList = ({
  handleChange,
  formData,
  listData,
}: {
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  formData: IformData;
  listData:[{list_title:string,id:number}]
}) => {
  console.log("lst", listData, formData);
  return (
    <div className="flex w-full ">
      <select
        onChange={handleChange}
        className="w-full  rounded-2xl shadow-inner px-2 border p-1.5 outline-none bg-[#F0F8FF] font-semibold"
        name="list_id"
        id=""
      >
        {Array.isArray(listData) &&
          listData.length > 0 &&
          listData.map((list, index) => (
            <option
              selected={formData.list_id === list.id}
              key={index}
              value={list.id}
            >
              {list.list_title}
            </option>
          ))}
      </select>
    </div>
  );
};

export default AvailableTaskList;
