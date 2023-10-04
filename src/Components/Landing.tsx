import Navbar from "./Navbar/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="lg:h-[85vh]  sm:w-4/5 items-center mx-auto overflow-hidden flex justify-center ">
        <div className="flex-col mt-20 lg:mt-0 flex gap-10 lg:flex-row  lg:gap-0 shadow-inner border  justify-between  items-center">
          <div className="flex   justify-center p-8 sm:p-14 h-full items-center flex-1 flex-col ">
            <img src="/logo.png" width={150} alt="" />
            <p className="text-justify text-sm lg:text-base font-semibold">
              🎉 Welcome to our Todoist-inspired web app! 🚀 Stay organized and
              boost productivity effortlessly. Our user-friendly platform helps
              you manage tasks seamlessly. ✨ Enjoy features like easy sign-up,
              smooth task browsing, and timely email notifications. ⏰ Never
              forget important tasks with upcoming reminders. 🌈 Experience a
              delightful interface, making task management a breeze. Your to-do
              list, simplified and accessible! ✅ #Todoist #Productivity
              #TaskManagement #Efficiency
            </p>
          </div>
          <div className="flex shadow-xl flex-grow-0 shrink-0 justify-center lg:justify-end h-full">
            <img
              src="./Schedule.gif"
              className="shrink-0 h-full bg-cover object-contain xl:w-full"
              // height={350}
              width={300}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
