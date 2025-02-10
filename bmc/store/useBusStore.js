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
    if (userEmail === process.env.ADMIN_EMAIL) {
      localStorage.setItem("user", JSON.stringify({ isAdmin: true }));
    }
    try {
      set({ loading: true });
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        set({ isAdmin: false });
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
