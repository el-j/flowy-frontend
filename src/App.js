import React from "react";
import {useRoutes} from 'hookrouter';

import Routes from './routes'
import MyNavbar from "./components/myNavbar"


export default function App() {
  const routeResult = useRoutes(Routes)
  console.log(routeResult);
  return (
    <>
      <MyNavbar />
      { routeResult || <> no page found </> }
    </>
  );
}

// <Route path="/topics">
//   <Topics useParams useRouteMatch/>
// </Route>
