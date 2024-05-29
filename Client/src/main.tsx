import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { Provider } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { RootRoute } from './components/routes/RootRoute';
import { ErrorRoute } from './components/routes/ErrorRoute';
import { PostsRoute, loader as postsLoader } from './components/routes/PostsRoute';
import { PostRoute, loader as postLoader, action as postAction } from './components/routes/PostRoute';
import { CommentRoute, loader as commentLoader, action as commentAction } from './components/routes/CommentRoute';
import { UserRoute, loader as userLoader } from './components/routes/UserRoute';
import { LoginRoute, action as loginAction } from './components/routes/LoginRoute';
import { RegisterRoute, action as registerAction } from './components/routes/RegisterRoute';
import { NewPostRoute, action as newPostAction } from './components/routes/NewPostRoute';
import { EditPostRoute, loader as editPostLoader } from './components/routes/EditPostRoute';
import { action as postCommentsAction } from './components/routes/PostCommentsRoute';
import { EditCommentRoute, loader as editCommentLoader } from './components/routes/EditCommentRoute';

if (import.meta.env.DEV) {
    axios.defaults.baseURL = "http://localhost:5212";
}

const router = createBrowserRouter([{
    path: "/",
    element: <RootRoute />,
    children: [
        {
            index: true,
            element: <PostsRoute />,
            loader: postsLoader,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts",
            element: <Navigate to="/" />
        },
        {
            path: "/posts/:id",
            element: <PostRoute />,
            loader: postLoader,
            action: postAction,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts/:postId/comments/:commentId",
            element: <CommentRoute />,
            loader: commentLoader,
            action: commentAction,
            errorElement: <ErrorRoute />
        },
        {
            path: "/users/:id",
            element: <UserRoute />,
            loader: userLoader,
            errorElement: <ErrorRoute />
        },
        {
            path: "/login",
            element: <LoginRoute />,
            action: loginAction,
            errorElement: <ErrorRoute />
        },
        {
            path: "/register",
            element: <RegisterRoute />,
            action: registerAction,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts/new",
            element: <NewPostRoute />,
            action: newPostAction,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts/:id/edit",
            element: <EditPostRoute />,
            loader: editPostLoader,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts/:id/comments",
            action: postCommentsAction
        },
        {
            path: "/posts/:postId/comments/:commentId/edit",
            element: <EditCommentRoute />,
            loader: editCommentLoader,
            errorElement: <ErrorRoute />
        }
    ],
    errorElement: <ErrorRoute />
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);