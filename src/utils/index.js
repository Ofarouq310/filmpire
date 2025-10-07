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
      localStorage.setItem("redirect_after_login", window.location.pathname);

      const redirectUrl = `${window.location.origin}?approved=true`;
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${redirectUrl}`;
    }
  } catch (error) {
    console.error("Failed to fetch TMDB token:", error.message);
  }
}


export async function createSessionID() {
  const token = localStorage.getItem("request_token");

  if (!token) {
    console.error("❌ No request_token found — user may not have approved TMDB yet.");
    return null;
  }

  try {
    const { data } = await moviesApi.post("/authentication/session/new", {
      request_token: token,
    });

    if (data?.session_id) {
      localStorage.setItem("session_id", data.session_id);
      localStorage.removeItem("request_token");
      return data.session_id;
    } else {
      console.error("❌ No session_id returned from TMDB:", data);
      return null;
    }
  } catch (err) {
    console.error("🚨 TMDB session creation failed:", err.response?.data || err.message);
    return null;
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
