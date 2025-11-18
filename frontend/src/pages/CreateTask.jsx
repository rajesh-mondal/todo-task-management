import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });

  const createTask = async () => {
    await API.post("/tasks/create", form);
    navigate("/");
  };

  return (
    <div className="bg-[#0c0e13] min-h-screen font-[Inter] text-white">
      <Header />

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <form className="mb-10 rounded-2xl border border-neutral-700 bg-linear-to-br from-[#101218]/80 to-[#0d0f14]/60 p-8 shadow-2xl shadow-black/50 backdrop-blur">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Create New Task
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Keep your tasks organized
            </h2>
            <p className="text-sm text-neutral-400">
              Fill in the details below. Status and priority help you track
              tasks easily.
            </p>
          </div>

          <div className="space-y-6">
            {/* Task Title */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-700 bg-[#0f1116]/70 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-[#0f1116] focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Task Title
              </span>
              <input
                type="text"
                placeholder="Enter task title"
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>

            {/* Description */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-700 bg-[#0f1116]/70 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-[#0f1116] focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Description
              </span>
              <textarea
                placeholder="Write a short description"
                rows="3"
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </label>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Priority */}
              <label className="flex flex-col gap-3 rounded-2xl border border-neutral-700 bg-[#0f1116]/70 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-[#0f1116] focus-within:shadow-lg focus-within:shadow-blue-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Priority
                </span>
                <select
                  className="w-full bg-transparent text-base text-white outline-none"
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option className="bg-[#0c0e13]" value="">
                    Select Priority
                  </option>
                  <option className="bg-[#0c0e13]" value="high">
                    High
                  </option>
                  <option className="bg-[#0c0e13]" value="medium">
                    Medium
                  </option>
                  <option className="bg-[#0c0e13]" value="low">
                    Low
                  </option>
                </select>
              </label>

              {/* Status */}
              <label className="flex flex-col gap-3 rounded-2xl border border-neutral-700 bg-[#0f1116]/70 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-[#0f1116] focus-within:shadow-lg focus-within:shadow-blue-500/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </span>
                <select
                  className="w-full bg-transparent text-base text-white outline-none"
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option className="bg-[#0c0e13]" value="">
                    Select Status
                  </option>
                  <option className="bg-[#0c0e13]" value="pending">
                    Pending
                  </option>
                  <option className="bg-[#0c0e13]" value="in-progress">
                    In Progress
                  </option>
                  <option className="bg-[#0c0e13]" value="completed">
                    Completed
                  </option>
                </select>
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-neutral-500">
              By submitting, you confirm this task is safe to store.
            </div>
            <div className="flex flex-1 justify-end gap-3">
              <button
                type="reset"
                className="w-full md:w-auto rounded-full border border-neutral-600 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={createTask}
                className="w-full md:w-auto rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
