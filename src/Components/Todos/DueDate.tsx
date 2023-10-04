// import { useState } from "react"

import { IformData } from "../../utils/types/type";

const DueDate = ({
  handleChange,
  formData,
}: {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  formData: IformData;
}) => {
  return (
    <input
      onChange={handleChange}
      value={formData.due_date}
      className="w-full  px-2 py-1 font-semibold rounded-2xl shadow-inner bg-[#F0F8FF] border   outline-none"
      placeholder="Add..."
      type="date"
      name="due_date"
      id=""
    />
  );
};

export default DueDate;
