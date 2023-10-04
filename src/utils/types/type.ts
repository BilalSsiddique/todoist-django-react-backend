// import dateFormatter from "../helper/dateFormatter";
// const { formattedDate } = dateFormatter();

export interface Todos {
  data: {
    message: string;
  };
  message: string;
  error: {
    status?: number;
    data?: [{ title: string; detail: string }];
    message?: string;
  };
}

export interface IformData {
  id: number | null;
  title: string;
  description: string;
  due_date: string;
  updated_at: string;
  created_at: string;
  is_Completed: boolean;
  priority: string | number;
  list_id: number | null;
  list_title: string | null;
}
export type IfilterCriteria = {
  completed: boolean | null;
  priority: number;
  due_date: string;
};

export const filterCriteriaInitialState: IfilterCriteria = {
  completed: null,
  priority: 0,
  due_date: "",
};

export interface IPagination {
  data: IformData;
  prev_page: number;
  next_page: number;
  all_pages: [number];
  current_page: number;
  total_pages: number;
}

export interface IfilteredData {
  filteredData: IPagination | null;
  setFilteredData: React.Dispatch<React.SetStateAction<IPagination | null>>;
}

// export const isFetchBaseQueryErrorType = (
//   error: any
// ): error is FetchBaseQueryError => "error" in error;
