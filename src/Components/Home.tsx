import Todos from "./Todos/Todos";
import Performance from "./Charts/Performance";

const Home = () => {
  return (
    <div className="overflow-scroll items-center p-2 sm:p-7 w-full grid gap-3 sm:gap-2 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] ">
      <div className="bg-[#ffffff4b] shadow-inner h-full w-full ">
        <Todos home={true} />
      </div>
      <div className="h-full bg-[#ffffff4b] py-2 shadow-inner flex w-full items-start justify-end ">
        <Performance />
      </div>
    </div>
  );
};

export default Home;
