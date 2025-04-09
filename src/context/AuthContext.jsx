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

  // Update the token check useEffect to handle token expiration
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            dispatch({ type: "LOGIN", payload: decoded });
          }
        } catch (error) {
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (formData) => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/auth/login`,
        formData
      );
      const { token } = response.data;

      // Clear any existing data first
      localStorage.clear();

      // Set new token
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      dispatch({ type: "LOGIN", payload: decoded });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear all localStorage data
    localStorage.clear();

    // Reset state
    dispatch({ type: "LOGOUT" });

    // Force clear any cached data
    window.location.href = "/login";
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
