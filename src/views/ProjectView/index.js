import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import mermaid from 'mermaid'
import FlowChart from '../../components/FlowChart'
import Options from '../../components/ProjectOptions'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'

const emptyProject = (name) => {
  return ({name: name,
  files:[],
  projectJson:{
    offset: {
      x: 0,
      y: 0
    },
    nodes: {},
    links: {},
    selected: {},
    hovered: {}
  }})
}

const ProjectView = (props) => {
      const myprojectName = props.projectName.slice(1)
      const apiUrl = `loadProject/:${myprojectName}`
      const loadProject = useFetchApi(apiUrl)
      const [error,setError] = useState(null)
      const [isLoaded,setIsLoaded]= useState(false)
      const [project,setProject]= useState()
      const flowchartRef = React.createRef();

      useEffect(() => {
        if (loadProject.length === 0) {
          let temp = emptyProject(myprojectName)
          setProject(temp)
          setIsLoaded(true)
        }
        else if (loadProject) {
          if (loadProject.projectJson) {
            setProject(loadProject)
            setIsLoaded(true)
          }
          else {
            let temp = emptyProject(myprojectName)
            setProject(temp)
            setIsLoaded(true)
          }
        }
      },[loadProject])

      const handleClick = ()=>{ console.log("yes")}

      const handleSave = (e) => {
        let response = {}
        let  thatData = project
        thatData.projectJson = flowchartRef.current.state
        saveProject(project.name,thatData).then(
          (result) => {
            setProject(result)
            setIsLoaded(true)
            setError(false)
          },
          (error) => {
            setProject({})
            setIsLoaded(false)
            setError(error)
          })
      }

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <div className='container-fluid'>
              {project&&project.projectJson?(
                <>
                  <Options handleSave={handleSave} items={project.projectJson.nodes}/>
                  <FlowChart id={'projectFlowGraph'} ref={flowchartRef} chartData={project.projectJson}/>
                </>
                ):(null)}
        </div>
      );
    }
}

export default ProjectView
