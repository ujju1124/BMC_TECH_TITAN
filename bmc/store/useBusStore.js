import { toast } from "react-toastify";
import { create } from "zustand";

export const useBusStore = create((set, get) => ({
  busData: [],
  loading: false,
  setBuses: (buses) => set({ buses }),
  isAdmin: false,
  complaints: [],
  ridesAround: [],
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

  addComplaint: async (complainData) => {
    try {
      const response = await fetch("/api/complaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complainData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Complaint added successfully");
      } else {
        console.log(result);
        toast.error("Error adding complaint:", result);
      }
    } catch (error) {
      console.error("Network or server error:", error);
    }
  },

  findRidesAround: async (locationData) => {
    const { startLocation, endLocation, clerkId, role, phoneNumber } =
      locationData;
    try {
      const res = await fetch("/api/activeroute", {
        method: "POST",
        body: JSON.stringify({
          startLocation,
          endLocation,
          clerkId,
          role,
          phoneNumber,
        }),
      });
      const data = await res.json();
      if (data.newUser) {
        toast.success(data.message);
        return;
      }
      toast.success(
        `Any active ${
          role === "passenger" ? "driver" : "passenger"
        } not founded around you try again after some time`
      );
    } catch (error) {
      toast.error(error.message);
    }
  },

  getComplaints: async () => {
    try {
      const res = await fetch("/api/complaint", {
        method: "GET",
      });
      const data = await res.json();
      set({ complaints: [...data.complaints] });
    } catch (error) {
      toast.error(error.message);
    }
  },

  approveComplaints: async (complainId) => {
    try {
      const response = await fetch("/api/complaint/approve", {
        method: "POST",
        body: JSON.stringify({ complainId }),
      });

      const result = await response.json();

      // Update the store to change the isVerified status of the complaint
      set((state) => {
        const updatedComplaints = state.complaints.map((complaint) =>
          complaint._id === complainId
            ? { ...complaint, isVerified: true } // Set isVerified to true
            : complaint
        );
        return { complaints: updatedComplaints };
      });

      toast.success(result.message || "Complaint status updated successfully");
    } catch (error) {
      console.log("Error : ", error);
      toast.error(error.message || "An error occurred");
    }
  },

  deleteComplaints: async (complainId) => {
    try {
      const res = await fetch("/api/complaint/approve", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complainId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete the complaint");
      }

      const data = await res.json();
      toast.success(data.message || "Complaint deleted successfully");

      set((state) => ({
        complaints: state.complaints.filter(
          (complaint) => complaint._id !== complainId
        ),
      }));
    } catch (error) {
      toast.error(error.message || "Failed to delete the complaint");
    }
  },
}));

export default useBusStore;
