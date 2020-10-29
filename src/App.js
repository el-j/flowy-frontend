import React, { useState } from "react";
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import useFetchApi from './tools/fetchApi/useFetchApi.js'
import Routes from "./routes";
import MyNavbar from "./components/MyNavbar";

export default function App() {

  const [searchResults,setSearchResults] = useState({})
  const [projectName,setProjectName] = useState(null)
  const allProjects = useFetchApi('getProjects')

  const handleSearch =(e) => {
    let searchValue = e.target.value
    let allProjectNames = Object.keys(allProjects)
    let searchResultNames = []
    let searchResults = {}
    if (searchValue) {
        searchResultNames = allProjectNames.filter(name => {
          if (name.includes(searchValue)) {
              return allProjects[name]
          }
        })
        searchResultNames.map(name => {
          searchResults[name] = allProjects[name]
          return name
        })
    }
    else {
      searchResults = allProjects
    }
    setSearchResults(searchResults)
  }
  return (
    <Router basename="/">
    <ThemeProvider theme={theme}>
      <MyNavbar
        handleSearch={handleSearch}
        projectName={projectName?projectName:null}
        />
      <Routes searchResults={searchResults} setProjectName={setProjectName}/>
      </ThemeProvider>
    </Router>
  );
}

// {routeResult || <> no page found </>}
// <Route path="/topics">
//   <Topics useParams useRouteMatch/>
// </Route>
