import React, { SetStateAction } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IPagination } from "../../utils/types/type";




const Pagination = ({
  data,
  setPage,
  page,
}: {
  data: IPagination;
  setPage: React.Dispatch<SetStateAction<number>>;
  page: number;
}) => {
  return (
    <div className="flex flex-wrap gap-5  items-end absolute left-8 top-4 w-[50%]">
      <div className="flex h-8 gap-2 ">
        <button
          disabled={data.prev_page === null}
          onClick={() => setPage(data.prev_page)}
          className={`disabled:border-[#999999] disabled:bg-gray-300  disabled:text-gray-500 flex items-center border p-1 border-black font-semi-bold`}
        >
          {data.prev_page !== null && <GrFormPrevious size={20} />}
          <p>Previous</p>
        </button>
        {Array.isArray(data.all_pages) &&
          data.all_pages.map((backPage: number, index: number) => (
            <button
              key={index}
              onClick={() => setPage(backPage)}
              className={`${
                backPage === page && "bg-[#F0F8FF]"
              } border border-black  flex font-semibold items-center p-2  shadow-inner`}
            >
              <p>{backPage}</p>
            </button>
          ))}
        <button
          disabled={data.next_page === null}
          onClick={() => setPage(data.next_page)}
          className="disabled:border-[#999999]  disabled:bg-gray-300 disabled:text-gray-500 flex items-center border p-1 border-black font-semi-bold"
        >
          <p>Next</p>
          {data.next_page !== null && <GrFormNext size={20} />}
        </button>
      </div>
      {/* Out Of */}
      <div className=" flex gap-1 items-center   ">
        <GrFormPrevious size={20} />
        <p>Page</p>
        <input
          onKeyDown={(event) => {
            if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
              event.preventDefault(); // Prevent typing
            }
          }}
        
          min={1}
          max={data.total_pages}
          type="number"
          onChange={(event) => setPage(+event.target.value)}
          value={data.current_page}
          className="w-12 outline-none rounded-md px-1 p-0.5 font-bold"
        />
        <p>of</p>
        <p>{data.total_pages} </p>
        <GrFormNext size={20} />
      </div>
    </div>
  );
};

export default Pagination;
