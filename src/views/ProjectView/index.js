import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import mermaid from 'mermaid'
import FlowChart from '../../components/FlowChart'
import Options from '../../components/ProjectOptions'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'
import NewItemOverlay from '../../components/newItemOverlay'
import actions from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'

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

      const [newItem,setNewItem]= useState({
        id: "node1",
        type: "input-output",
        position: {
          x: 300,
          y: 100
        },
        ports: {
          port1: {
            id: "port1",
            type: "input",
            properties: {
              value: "yes"
            }
          },
          port2: {
            id: "port2",
            type: "output",
            properties: {
              value: "no"
            }
          }
        }
      })
      const [newItemCreate,setNewItemCreate]= useState(false)
      const itemRef = React.createRef();
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

      const handleClick = ()=>{
         console.log("yes")}

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

      const handleChange = event => {
        // console.log(event.currentTarget.id,event.currentTarget.value,newItem)
        let id = event.currentTarget.id
        let portAmount = Object.keys(newItem.ports).length+1
        let ports = newItem.ports
        let thisPortId = `port${portAmount}`
        let temp = {}
        switch (id) {
          case 'newInputPortname':

            break;
          case 'newInputProperties':
          console.log('change Portname:',event.currentTarget.value,newItem);
          temp = {[thisPortId]:{
              id: thisPortId,
              type: "input",
            properties: {
              value: event.currentTarget.value
            }}
            }

            setNewItem({ports:{...temp,...ports}})
            break;
          default:

        }
      }
      const handleConfigureNode = (e) => {
        setNewItemCreate(true)
        console.log(e)
      }

      const stateActions = mapValues(actions, (any) => {
        console.log(actions);
        return( (...args: any) => {
          console.log(args,any)
          setProject(...args)

        }
      )
    })




const handleDeletePort = port => {
  console.log(port)
  let ports = newItem.ports
  let allPorts = Object.keys(ports)
  let temp = delete ports[port]
  console.log(temp,ports);
  setNewItem({...newItem,ports:{...ports}})
}

const handleAdd  = event => {
  let id = event.currentTarget.id
  let portAmount = Object.keys(newItem.ports)
  if (!portAmount.length <= 0) {
    portAmount = Math.max(...portAmount.toString().match(/\d+/g)) +1
  }
  else {
    portAmount = 1
  }
  console.log(portAmount);
  let ports = newItem.ports
  let thisPortId = `port${portAmount}`
  let temp = {}
  let type = ''
  switch (id) {
    case 'addInput':
        type='input'
      break;
    case 'addOutput':
        type='output'
      break;
    default:

  }

    temp = {[thisPortId]:{
        id: thisPortId,
        type: type,
      properties: {
        value: ''
      }}
      }

      ports = {...ports,...temp}
      setNewItem({...newItem,ports:{...ports}})
      console.log('change Portname:',newItem);

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
                {console.log("we rerender",newItem,actions)}
                  <NewItemOverlay
                    handleAdd={handleAdd }
                    handleDeletePort={handleDeletePort }
                    handleChange={handleChange}
                    handleClose={() =>setNewItemCreate(false)}
                    node={{...newItem}}
                    submit={'value'}
                    itemRef={itemRef}
                    show={newItemCreate}
                  />
                  <Options
                    itemRef={itemRef}
                    handleSave={handleSave}
                    newItem={newItem}
                    handleConfigureNode={handleConfigureNode}
                    items={project.projectJson.nodes}
                    />
                  <FlowChart id={'projectFlowGraph'}
                    stateActions={stateActions}
                    ref={flowchartRef}
                    chartData={project.projectJson}/>
                </>
                ):(null)}
        </div>
      );
    }
}

export default ProjectView
