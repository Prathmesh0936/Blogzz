import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import AuthPage from './pages/AuthPage';
import PostFormPage from './pages/PostFormPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'posts/:id', element: <PostDetailPage /> },
      {
        path: 'posts/new',
        element: (
          <ProtectedRoute>
            <PostFormPage mode="create" />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <ProtectedRoute>
            <PostFormPage mode="edit" />
          </ProtectedRoute>
        ),
      },
      { path: 'auth/:mode', element: <AuthPage /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => (
  <>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </>
);

export default App;

