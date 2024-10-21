import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);

  const { setLoading, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  const handleOrderChange = () => {
    setOrder((prevOrder) => {
      const newOrder = prevOrder === "desc" ? "asc" : "desc";
      return newOrder;
    });
  };

  const handleButtonClick = (id) => {
    if (id !== selectedButton) {
      setSelectedButton(id);
    } else {
      setSelectedButton(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const task = await axios.delete(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (task.status === 200) {
        setTasks(tasks.filter((t) => t._id !== id));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      toast.success("Logged out successfully", { position: "top-center" });
      setTimeout(() => {
        setIsLoggedIn(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data.message || "Server Error!", {
        position: "top-center",
      });
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/accesstoken`
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          await handleLogout();
        }
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {};

        if (selectedButton) {
          params.sortBy = selectedButton;
        }

        if (order) {
          params.order = order;
        }

        if (status) {
          params.status = status;
        }

        if (priority) {
          params.priority = priority.toLowerCase();
        }
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params,
          }
        );
        setLoading(false);
        setTasks(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(null);
            setTasks([]);
          } else if (error.response.status === 403) {
            try {
              await refreshToken();
              await fetchTasks();
            } catch (error) {
              console.log(error);
            }
          }
        } else if (error.request) {
          setError("Network error. Please try again later.");
        } else {
          setError("An error occurred.");
        }
      }
    };
    fetchTasks();
  }, [priority, status, order, selectedButton, setLoading]);

  return (
    <TaskContext.Provider
      value={{
        priority,
        status,
        tasks,
        error,
        order,
        editTask,
        selectedButton,
        handleStatusChange,
        handlePriorityChange,
        setPriority,
        setStatus,
        setTasks,
        setError,
        setOrder,
        setEditTask,
        setSelectedButton,
        handleDelete,
        handleButtonClick,
        handleOrderChange,
        handleLogout,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
