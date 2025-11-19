import API from "../api";

export default function LogoutButton() {
  const handleLogout = async () => {
    await API.post("/logout");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="self-start lg:self-center rounded-full border border-red-500/50 px-5 py-2 text-sm font-medium text-red-400
                   hover:bg-red-500/10 transition"
    >
      Logout
    </button>
  );
}
