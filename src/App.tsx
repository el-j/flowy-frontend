import React, { useState } from "react";
import { HashRouter as Router } from 'react-router-dom';

import useFetchApi from './tools/fetchApi/useFetchApi';
import Routes from "./routes";
import MyNavbar from "./components/myNavbar";
import { Projects, SearchResults } from "./types";

export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResults>({});
  const [projectName, setProjectName] = useState<string | null>(null);
  const allProjects = useFetchApi<Projects>('getProjects');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    
    if (!allProjects || typeof allProjects === 'boolean') {
      return;
    }

    const allProjectNames = Object.keys(allProjects);
    let results: SearchResults = {};

    if (searchValue) {
      const searchResultNames = allProjectNames.filter(name => 
        name.includes(searchValue)
      );
      
      searchResultNames.forEach(name => {
        results[name] = allProjects[name];
      });
    } else {
      results = allProjects;
    }

    setSearchResults(results);
  };

  return (
    <Router basename="/">
      <MyNavbar
        handleSearch={handleSearch}
        projectName={projectName}
      />
      <Routes searchResults={searchResults} setProjectName={setProjectName} />
    </Router>
  );
}
