import React from "react";
import {useRoutes} from "hookrouter";

import Routes from "./routes";
import MyNavbar from "./components/MyNavbar";

export default function App() {
  const routeResult = useRoutes(Routes);
  return (
    <>
      <MyNavbar name={routeResult.props.projectName?routeResult.props.projectName.substring(1):null}/>
      {routeResult || <> no page found </>}
    </>
  );
}

// <Route path="/topics">
//   <Topics useParams useRouteMatch/>
// </Route>
