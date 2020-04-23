import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import mermaid from 'mermaid'
import MyFlowChart from '../../components/FlowChart'
import Options from '../../components/ProjectOptions'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'
import NewItemOverlay from '../../components/newItemOverlay'
import { actions } from "@mrblenny/react-flow-chart";
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

let item = {
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
}


const ProjectView = (props) => {
      const myprojectName = props.projectName.slice(1)
      const apiUrl = `loadProject/:${myprojectName}`
      const loadProject = useFetchApi(apiUrl)
      const [error,setError] = useState(null)
      const [isLoaded,setIsLoaded]= useState(false)
      const [project,setProject] = useState()
      const [chart, setChart] = useState(emptyProject)

      const [newItem,setNewItem]= useState(item)
      const [newItemCreate,setNewItemCreate]= useState(false)
      const itemRef = React.createRef();
      const flowchartRef = React.createRef();

      useEffect(() => {
        if (loadProject.length === 0) {
          let temp = emptyProject(myprojectName)
          setProject(temp)
          setIsLoaded(true)
          setChart(temp.projectJson)
        }
        else if (loadProject) {
          if (loadProject.projectJson) {
            setProject(loadProject)
            setChart(loadProject.projectJson)
            setIsLoaded(true)
          }
          else {
            let temp = emptyProject(myprojectName)
            setProject(temp)
            setChart(temp.projectJson)
            setIsLoaded(true)
          }
        }
      },[loadProject])

      // const handleSelected = () =>{
      //    console.log("yes")
      //  }
       useEffect(()=>{
         if (chart.selected) {
         if (!chart.selected.type) {
           console.log("NOTHING SELECTED:",item);
           setNewItem(item)
         }
         else {
           console.log('we have selected', chart.selected.id);
           let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
             if (node === chart.selected.id) {
               return node
             }
           })
           console.log("the selected node",chart.nodes[thisSelectedNode[0]]);
           setNewItem(chart.nodes[thisSelectedNode[0]])
         }
         }
       },[chart])

      const handleSave = (e) => {
        let response = {}
        let  thatData = project
        thatData.projectJson = chart
        saveProject(project.name,thatData).then(
          (result) => {
            setProject(result)
            setChart(result.projectJson)
            setIsLoaded(true)
            setError(false)
          },
          (error) => {
            setProject({})
            setIsLoaded(false)
            setError(error)
          })
      }

      const handleChange = (event,nodeId) => {
        console.log(event.currentTarget.id,event.currentTarget.value,nodeId)
        let thisSelectedNode
        let thisSelectedNodeName
        let thisChart = chart
        if (nodeId) {
            thisSelectedNodeName = Object.keys(chart.nodes).filter(node => {
            if (node === nodeId) {
              return node
            }
          })
          thisSelectedNode = thisChart.nodes[thisSelectedNodeName[0]]
        }
        let id = event.currentTarget.id
        let value = event.currentTarget.value
        // let portAmount = Object.keys(newItem.ports).length+1
        // let ports = newItem.ports
        // let thisPortId = `port${portAmount}`
        switch (id) {
          case 'changeNodeName':
          console.log('we change',id,thisSelectedNode);
          thisSelectedNode.name = value
            break;
          case 'changeNodeDescription':
          console.log('we change',id);
          thisSelectedNode.text = value
            break;
          case 'changeNodeImage':
          console.log('we change',id, "TODO: Upload new file and remove the old one");
          // thisSelectedNode.picture = value
            break;
          default:

        }
        thisChart.nodes[thisSelectedNodeName[0]] = thisSelectedNode
        setChart({...chart, ...thisChart})
      }
      const handleConfigureNode = (e) => {
        setNewItemCreate(true)
        console.log(e)
      }

      const stateActionsCallbacks = Object.keys(actions).reduce((obj,key,idx) => {
         obj[key] = (...args)=>{
           let action = actions[key];
           let newChartTransformer = action(...args);
           let newChart = newChartTransformer(chart);
           setChart({...chart, ...newChart});
           return newChart;
       };
       return obj;
     },{})
     //
     useEffect(() => {
       if (chart.selected) {
         if (chart.selected.type) {
         let name = chart.selected.id
         // console.log("the selected node",chart);
         let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
         if (node === name) {
           return node
         }
         })
         let saveChart = chart
         let saveNewItem = newItem
         let thisItem = saveChart.nodes[thisSelectedNode[0]]
         thisItem.ports = saveNewItem.ports
         chart.nodes[thisSelectedNode[0]] = thisItem
         setChart({...chart,...saveChart});
         setNewItem(thisItem)
        }
       }
     },[newItem])




    const handleDeletePort = port => {
      console.log(port)
      let ports = newItem.ports
      let allPorts = Object.keys(ports)
      let temp = delete ports[port]
      console.log(temp,ports);
      setNewItem({...newItem,ports:{...ports}})
    }

    const handleAddPort  = event => {
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
                  <NewItemOverlay
                    handleAdd={handleAddPort }
                    handleDeletePort={handleDeletePort }
                    handleChange={handleChange}
                    handleClose={() =>setNewItemCreate(false)}
                    node={{...newItem}}
                    submit={'value'}
                    show={newItemCreate}
                    // itemRef={itemRef}
                    chart={chart}
                    selected={chart.selected}
                  />
                  {console.log(flowchartRef)}
                  <Options
                    handleSave={handleSave}
                    newItem={newItem}
                    itemRef={itemRef}
                    handleConfigureNode={handleConfigureNode}
                    chart={chart}
                    selected={chart.selected}
                    />
                  <MyFlowChart
                    id={'projectFlowGraph'}
                    stateActions={stateActionsCallbacks}
                    ref={flowchartRef}
                    chartData={chart}/>
                </>
                ):(null)}
            </div>
      );
    }
}

export default ProjectView
