import React from 'react';
import ReactDOM from 'react-dom/client';

import "./scss/main.scss";

import { Provider } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { RootRoute } from './router/routes/RootRoute';
import { ErrorRoute } from './router/routes/ErrorRoute';
import { commentAction } from './router/actions/commentAction';
import { loginAction } from './router/actions/loginAction';
import { postAction } from './router/actions/postAction';
import { registerAction } from './router/actions/registerAction';
import { postLoader } from './router/loaders/postLoader';
import { postsLoader } from './router/loaders/postsLoader';
import { userLoader } from './router/loaders/userLoader';
import { LoginRoute } from './router/routes/auth/LoginRoute';
import { RegisterRoute } from './router/routes/auth/RegisterRoute';
import { CommentRoute } from './router/routes/comments/CommentRoute';
import { EditCommentRoute } from './router/routes/comments/EditCommentRoute';
import { EditPostRoute } from './router/routes/posts/EditPostRoute';
import { NewPostRoute } from './router/routes/posts/NewPostRoute';
import { PostRoute } from './router/routes/posts/PostRoute';
import { PostsRoute } from './router/routes/posts/PostsRoute';
import { UserRoute } from './router/routes/user/UserRoute';
import { commentLoader } from './router/loaders/commentLoader';
import { newPostAction } from './router/actions/newPostAction';
import { newCommentAction } from './router/actions/newCommentAction';
import { UserPostsRoute } from './router/routes/user/UserPostsRoute';
import { userPostsLoader } from './router/loaders/userPostsLoader';
import { UserCommentsRoute } from './router/routes/user/UserCommentsRoute';
import { userCommentsLoader } from './router/loaders/userCommentsLoader';

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
            errorElement: <ErrorRoute />,
            children: [
                {
                    path: "/users/:id/posts",
                    element: <UserPostsRoute />,
                    loader: userPostsLoader,
                },
                {
                    path: "/users/:id/comments",
                    element: <UserCommentsRoute />,
                    loader: userCommentsLoader,
                }
            ]
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
            loader: postLoader,
            errorElement: <ErrorRoute />
        },
        {
            path: "/posts/:id/comments",
            action: newCommentAction
        },
        {
            path: "/posts/:postId/comments/:commentId/edit",
            element: <EditCommentRoute />,
            loader: commentLoader,
            errorElement: <ErrorRoute />
        }
    ],
    errorElement: <ErrorRoute />
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);