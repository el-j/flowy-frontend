import React from "react";
import {useRoutes} from 'hookrouter';

import Routes from './routes'
import MyNavbar from "./components/myNavbar"


export default function App() {
  const routeResult = useRoutes(Routes)
  return (
    <>
      <div>
        <MyNavbar />
      {routeResult || <>no page found</>}
      </div>
    </>
  );
}

// <Route path="/topics">
//   <Topics useParams useRouteMatch/>
// </Route>
