import React from "react";



export const getFiles = (state) => fetch("http://localhost:4000/reload").then(res => res.json())
export const getAllFiles = (state) => fetch(`http://localhost:4000/getallfiles`).then(res => res.json())

export const loadFiles = (filetype) => fetch(`http://localhost:4000/loadfile/:${filetype}`).then(res => res.json())

export const loadPngs = (filetype) => fetch(`http://localhost:4000/loadpngs`).then(res => res.json())

export default {getFiles, loadFiles, getAllFiles}
// let cb = getFiles((files)=>{console.log(files)})
