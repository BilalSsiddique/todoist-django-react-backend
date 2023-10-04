import React from "react";
import { IformData } from "../../utils/types/type";

const IsComplete = ({
  handleChange,
  formData,
}: {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  formData: IformData;
}) => {

  console.log('fom',formData)
  return (
    <div className="flex font-medium shadow-inner rounded-2xl py-1.5 bg-[#F0F8FF] justify-between px-3 w-full">
      <label htmlFor="isComplete">Completed</label>
      <input
        onChange={handleChange}
        checked={formData.is_Completed}
        type="checkbox"
        name="is_Completed"
        id="isComplete"
      />
    </div>
  );
};

export default IsComplete;
