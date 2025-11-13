/*
  THIS IS THE NEW FETCH API. It is stable and can be used for all GET requests against the api.
  it replaces: getProjects, loadProject and will replace later more
*/

import { useState, useEffect } from "react";

const useFetchApi = <T = any>(url?: string): T | false => {
  const [data, dataSet] = useState<T | false>(false);
  let api = `http://localhost:9023/api`;

  if (url !== undefined) {
    api = `${api}/${url}`;
  }

  useEffect(() => {
    async function fetchMyApi() {
      try {
        let response = await fetch(api);
        const result = await response.json();
        dataSet(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        dataSet(false);
      }
    }
    fetchMyApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return data;
};

export default useFetchApi;
