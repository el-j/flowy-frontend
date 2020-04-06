import { useState, useEffect } from "react";

export default function useFetchApi(url) {

  let api =`http://localhost:4000/api`

  if (url !== undefined) {
      api =`${api}/${url}`
  }
  const [data, setData] = useState([]);
  console.log('try to fetch',api)
  useEffect(() => {
    fetch(api)
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  console.log(data)
  return data;
}
