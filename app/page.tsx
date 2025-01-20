import TaskPage from "./task/page";
import { MetricsSection } from "./task/components/metrics/metrix";
import { EditTaskDemo } from "./task/components/dialog/edit-todo-dialog";
export default function Home() {
  return (
    <div className="">
      <main className="mx-56 my-10">
        <p className="text-4xl font-semibold text-primary">Welcome!</p>
        <p className="text-2xl font-normal text-slate-400">Let's plan your tasks</p>
        <TaskPage/>
        <MetricsSection/>
        <EditTaskDemo/> 
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
