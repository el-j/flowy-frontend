/*
  THIS IS THE NEW FETCH API. It is stable and can be used for all GET requests against the api.
  it relplaces: getProjects, loadProject and will replace later more

*/

import { useState, useEffect } from "react";


const useFetchApi = (url) => {
   const [data, dataSet] = useState(false)
   let api =`http://localhost:9023/api`

  if (url !== undefined) {
      api =`${api}/${url}`
    }

  async function fetchMyApi() {
    let response = await fetch(api)
    response = await response.json()
    dataSet(response)
  }

  useEffect(() => {
    fetchMyApi();
  }, []);
  return data
}
export default useFetchApi
