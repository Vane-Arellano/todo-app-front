import TaskPage from "./todos/page";
import { MetricsSection } from "./todos/components/metrics/metrics";
import { EditTaskDialog } from "./todos/components/dialog/edit-todo-dialog";
import { Toaster } from "sonner";
import { description, title } from "@/const/todo-constants";
export default function Home() {
  return (
    <div>
      <main className="mx-56 my-10">
        <p className="text-4xl font-semibold text-primary">{title}</p>
        <p className="text-2xl font-normal text-slate-400">{description}</p>
        <TaskPage/>
        <MetricsSection/>
        <EditTaskDialog/> 
        <Toaster/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
