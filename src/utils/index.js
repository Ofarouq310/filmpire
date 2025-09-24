import axios from "axios";

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export async function fetchToken() {
  try {
    const { data } = await moviesApi.get("/authentication/token/new");
    const { request_token } = data;

    if (request_token) {
      localStorage.setItem("request_token", request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.error("Axios error:", error.message);
  }
}

export async function createSessionID() {
  const request_token = localStorage.getItem("request_token");
  if (!request_token) return;

  console.log("Creating session with token:", request_token);

  try {
    const { data } = await moviesApi.post("/authentication/session/new", {
      request_token,
    });
    const { session_id } = data;

    if (session_id) {
      localStorage.setItem("session_id", session_id);
      localStorage.removeItem("request_token");
    }

    return session_id;
  } catch (error) {
    if (error.response) {
      console.error("TMDB error:", error.response.data);
    } else {
      console.error("Session creation failed:", error.message);
    }
  }
}

export async function logout() {
  const session_id = localStorage.getItem("session_id");
  if (!session_id) {
    console.warn("No session_id to delete");
    return false;
  }

  try {
    const { data } = await moviesApi.delete("/authentication/session", {
      data: { session_id },
    });

    console.log("TMDB logout response:", data);

    if (data.success) {
      localStorage.removeItem("request_token");
      localStorage.removeItem("session_id");
      localStorage.removeItem("user");
      return true;
    } else {
      console.warn("TMDB failed to delete session:", data);
      return false;
    }
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    return false;
  }
}
