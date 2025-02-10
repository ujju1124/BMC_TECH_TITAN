import { create } from "zustand";

export const useBusStore = create((set) => ({
  busData: [],
  loading: false,
  setBuses: (buses) => set({ buses }),
  isAdmin: false,
  fetchBuses: async () => {
    set({ loading: true });
    try {
      const response = await fetch("/api/busdata/", { method: "GET" });
      const data = await response.json();
      set({ busData: data.busData });
    } catch (error) {
      console.error("Error while fetching the locations:", error);
    } finally {
      set({ loading: false });
    }
  },
  checkIsAdmin: async (userEmail) => {
    if (userEmail === process.env.ADMIN_ID) {
      localStorage.setItem("user", JSON.stringify({ isAdmin: true }));
    }
    try {
      set({ loading: true });
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        const response = await fetch("/admin/", {
          method: "POST",
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await response.json();
        if (data.user && data.isAdmin) {
          localStorage.setItem("user", JSON.stringify({ isAdmin: true }));
          set({ isAdmin: true });
        }
      } else {
        if (user && user.isAdmin) {
          set({ isAdmin: true });
        }
      }
      return false;
    } catch (error) {
      console.error("Error while checking admin status:", error);
    }
  },
}));

export default useBusStore;
