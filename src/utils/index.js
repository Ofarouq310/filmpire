import axios from "axios";

// GET request with axios

const moviesApi = axios.create ({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});

export async function fetchToken() {
  try {
    const response = await moviesApi.get("/authentication/token/new");
    console.log(response.data);
    const {request_token}  = response.data;
    console.log(request_token)
    if(response){
        localStorage.setItem("request_token", request_token);
        window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}`
    }

  } catch (error) {
    console.error("Axios error:", error.message);
  }
}