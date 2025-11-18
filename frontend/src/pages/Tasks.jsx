import { useEffect, useState } from "react";
import API from "../api";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks/list");
      setTasks(res.data);
    } catch {
      window.location.href = "/login";
    }
  };

  const deleteTask = async (id) => {
    await API.post(`/tasks/delete/${id}`);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="bg-[#191D26] min-h-screen font-[Inter] text-white">
      <Header />
      <section className="py-10" id="tasks">
        <div className="container mx-auto px-4">
          {/* Search Box */}
          <div className="p-2 flex justify-end">
            <div className="flex">
              <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                <input
                  type="search"
                  className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                  placeholder="Search Task"
                />
                <button className="absolute right-3 top-0 h-full text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <div className="mb-14 items-center justify-between sm:flex">
              <h2 className="text-2xl font-semibold text-white max-sm:mb-4">
                Your Tasks
              </h2>
              <div className="flex items-center space-x-5">
                <a
                  href="/create-task"
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white"
                >
                  Add Task
                </a>
                <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white">
                  Delete All
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              <table className="table-fixed overflow-auto xl:w-full text-white bg-transparent">
                <thead>
                  <tr>
                    <th className="p-4 pb-8 text-sm font-semibold w-[260px]">
                      Title
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold w-full">
                      Description
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold md:w-[150px]">
                      Status
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold md:w-[120px]">
                      Priority
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold md:w-[120px]">
                      Options
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-[#2E3443] [&>td]:px-4 [&>td]:py-3"
                    >
                      {/* Title */}
                      <td className="font-medium">{task.title}</td>

                      {/* Description */}
                      <td className="text-gray-300">{task.description}</td>

                      {/* Status */}
                      <td className="text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                            ${
                              task.status === "pending"
                                ? "bg-yellow-600/70"
                                : task.status === "completed"
                                ? "bg-green-600/70"
                                : "bg-blue-600/70"
                            }
                        `}
                        >
                          {task.status}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="text-center capitalize">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            task.priority === "high"
                              ? "bg-red-600/70"
                              : task.priority === "medium"
                              ? "bg-yellow-600/70"
                              : "bg-green-600/70"
                          }
                        `}
                        >
                          {task.priority}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-400 hover:text-red-500"
                          >
                            Delete
                          </button>
                          <button className="text-blue-400 hover:text-blue-500">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {tasks.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-gray-400"
                      >
                        No tasks available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
