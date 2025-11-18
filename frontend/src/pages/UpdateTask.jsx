import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch existing task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/single/${id}`);
        if (res.data) {
          setForm({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
            priority: res.data.priority,
          });
        }
      } catch {
        alert("Failed to load task.");
      }
      setLoading(false);
    };

    fetchTask();
  }, [id]);

  // Update task
  const updateTask = async () => {
    setErrors({});

    try {
      const res = await API.post(`/tasks/update/${id}`, form);
      if (res.data.status) {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        return;
      }
      alert("Task update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0e13] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#0c0e13] min-h-screen font-[Inter] text-white">
      <Header />

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <form className="mb-10 rounded-2xl border border-neutral-700 bg-linear-to-br from-[#101218]/80 to-[#0d0f14]/60 p-8 shadow-2xl shadow-black/50 backdrop-blur">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Update Task
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Modify your existing task
            </h2>
            <p className="text-sm text-neutral-400">
              Update the details and keep your workflow clean.
            </p>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <label
              className={`flex flex-col gap-3 rounded-2xl border p-5 text-sm transition ${
                errors.title ? "border-red-500" : "border-neutral-700"
              } focus-within:border-blue-500`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Task Title
              </span>
              <input
                type="text"
                value={form.title}
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <span class="text-xs text-neutral-500">
                Task title cannot be empty.
              </span>
            </label>

            {errors.title && (
              <p className="text-red-500 text-xs -mt-4">{errors.title[0]}</p>
            )}

            {/* Description */}
            <label
              className={`flex flex-col gap-3 rounded-2xl border p-5 text-sm transition ${
                errors.description ? "border-red-500" : "border-neutral-700"
              } focus-within:border-blue-500`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Description
              </span>
              <textarea
                rows="3"
                value={form.description}
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <span class="text-xs text-neutral-500">
                Describe the task details and required steps.
              </span>
            </label>

            {errors.description && (
              <p className="text-red-500 text-xs -mt-4">
                {errors.description[0]}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Priority */}
              <label
                className={`flex flex-col gap-3 rounded-2xl border p-5 text-sm transition ${
                  errors.priority ? "border-red-500" : "border-neutral-700"
                } focus-within:border-blue-500`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Priority
                </span>

                <select
                  value={form.priority}
                  className="w-full bg-transparent text-base text-white outline-none"
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
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
                <span class="text-xs text-neutral-500">
                  The initial priority level is Low.
                </span>
              </label>

              {/* Status */}
              <label
                className={`flex flex-col gap-3 rounded-2xl border p-5 text-sm transition ${
                  errors.status ? "border-red-500" : "border-neutral-700"
                } focus-within:border-blue-500`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Status
                </span>

                <select
                  value={form.status}
                  className="w-full bg-transparent text-base text-white outline-none"
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
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
                <span class="text-xs text-neutral-500">
                  Choose Status (Final state is Completed).
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-xs text-neutral-500">
              Make sure all details are correct.
            </div>

            <div className="flex justify-end gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="rounded-full border border-neutral-600 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={updateTask}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Update Task
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
