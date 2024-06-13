import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../pages/home';
import SignInSide from '../pages/login/sign';
import NotFound from '../pages/notFound'
import { Routes, Route, Navigate } from 'react-router-dom';

const pages = [
    { path: "*", component: NotFound },
    { path: "/", component: Home, auth: true },
    { path: "/login", component: SignInSide },
  ];

  const MyRouter = () => {
    const {user} = useSelector(state => state.auth)
    const accessToken = user ? user.accessToken : null;
    
    return (<>
    <Routes>
    {pages.map(({ component: Component, path, auth }) => {
              if (auth) {
                return (
                  <Route
                    key={path}
                    Component={(props) => (accessToken ? <Component {...props} /> :  <Navigate to='/login' />
                    )}
                    path={path}
                  />
                );
              }
    
              return (
                  <Route
                    key={path}
                    Component={(props) => (<Component {...props} />)}
                    path={path}
                  />
                );
            })}
            
            <Route element={<NotFound />} />
    </Routes>
    </>)
  }

  export default MyRouter;