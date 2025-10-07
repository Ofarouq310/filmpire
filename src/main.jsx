import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Movies from './sections/Movies.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import MovieInformation from './sections/MovieInformation.jsx'
import Actor from './sections/Actor.jsx'
import MyProfile from './sections/MyProfile.jsx'  

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Movies key="home" />,
      },
      {
        path: 'movie/:id',
        element: <MovieInformation />,
      },
      {
        path: ':categoryOrGenre',
        element: <Movies key="category" />,
      },
      {
        path: 'actor/:id',
        element: <Actor />,
      },
      {
        path: 'myprofile',
        element:
            <MyProfile />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
