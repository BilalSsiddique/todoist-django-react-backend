import { IfilterCriteria, IformData } from "../types/type";


import dateConvert from "./dateConvert";

export const taskMatchCriteria = (
  task: IformData,
  filterCriteria: IfilterCriteria
) => {
  const { due_date } = dateConvert(task.due_date);
  const isPriorityMatch =
    filterCriteria.priority === 0 || filterCriteria.priority === task.priority;
  const isCompletedMatch =
    filterCriteria.completed === null ||
    filterCriteria.completed === task.is_Completed;
  const isDueDateMatch =
    filterCriteria.due_date === '' ||
    filterCriteria.due_date === due_date;

  return isPriorityMatch && isCompletedMatch && isDueDateMatch;
};
