import TaskPage from "./todos/page";
import { MetricsSection } from "./todos/components/metrics/metrics";
import { EditTaskDemo } from "./todos/components/dialog/edit-todo-dialog";
import { Toaster } from "sonner";
export default function Home() {
  return (
    <div className="">
      <main className="mx-56 my-10">
        <p className="text-4xl font-semibold text-primary">Welcome!</p>
        <p className="text-2xl font-normal text-slate-400">Let&apos;s plan your tasks</p>
        <TaskPage/>
        <MetricsSection/>
        <EditTaskDemo/> 
        <Toaster/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
