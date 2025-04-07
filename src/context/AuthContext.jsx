import axios from "axios";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const initalState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      dispatch({ type: "LOGIN", payload: decoded });
    }
  }, []);

  const login = async (formData) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/auth/login`,
        formData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      dispatch({ type: "LOGIN", payload: decoded });
      navigate("/");
      setLoading(false);
    } catch (err) {
      setLoading(false);

      setError(err.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
