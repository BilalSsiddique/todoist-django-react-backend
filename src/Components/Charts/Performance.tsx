import { useGetPerformanceQuery } from "../../redux/services/todos/todosApi";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/features/auth/authSlice";
import Loader from "../Loader";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const Performance = () => {
  const token = useAppSelector(selectToken);
  const { data, isLoading } = useGetPerformanceQuery({ token });

  console.log("data", data);

  if (isLoading) {
    return <Loader />;
  }

  const chartData = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "# of Tasks",
        data: [data.completed, data.uncompleted],
        backgroundColor: ["#28A745", "#e74c3c"],
      },
    ],
  };

  return (
    <div>
      <Pie data={chartData} width={250} height={250} />
    </div>
  );
};

export default Performance;
