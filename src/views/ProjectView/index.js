import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject, apiUrl } from '../../tools/fetchApi'
import mermaid from 'mermaid'
import MyFlowChart from '../../components/FlowChart'
import RightPanel from '../../components/RightPanel'
import LeftPanel from '../../components/LeftPanel'
import useFetchApi from '../../tools/fetchApi/useFetchApi.js'

// import NewItemOverlay from '../../components/newItemOverlay'
import { actions } from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'

const emptyProject = (name) => {
  return ({
    projectId: name,
    name: name,
  files:[],
  description: '',
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
  id: "_NEWNODE",
  type: "input-output",
  name: 'Your Node Name',
  text: 'Your Node Description',
  position: {
    x: 300,
    y: 100
  },
  ports: {
    port1: {
      id: "port1",
      type: "input",
      connected:false,
      properties: {
        value: "yes"
      }
    },
    port2: {
      id: "port2",
      type: "output",
      connected:false,
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
      const [showHidePanel,setShowHidePanel] = useState(true)
      const [showHidePanelRight,setShowHidePanelRight] = useState(true)
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
           // console.log("NOTHING SELECTED:",item);
           setNewItem(item)
         }
         else if (chart.selected.type === 'node'){
           // console.log('we have selected', chart.selected.id);
           let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
             if (node === chart.selected.id) {
               return node
             }
           })
           // console.log("the selected node",chart.nodes[thisSelectedNode[0]]);
           setNewItem(chart.nodes[thisSelectedNode[0]])
         }
         else {
           // console.log('we have selected', chart.selected.id, chart.selected.type);
           setNewItem(item)
         }
         }
       },[chart])

      const handleSave = (e) => {
        let response = {}
        let  thatData = project
        thatData.projectJson = chart
        saveProject(project.projectId,thatData).then(
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
        let thisProject = project
        let oldNodeId = nodeId
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
          console.log('we change',id,thisSelectedNode);
          thisSelectedNode.text = value
            break;
          case 'changeNodeImage':
          console.log('we change',id, "TODO: Upload new file and remove the old one");
          // thisSelectedNode.picture = value
            break;
          case 'changeProjectName':
          console.log('we change',id,value,thisSelectedNode);
          thisProject.name = value
            break;
          case 'changeProjectDescription':
          console.log('we change',id,value,thisSelectedNode);
          thisProject.description = value
            break;
          case 'changeNodeId':
          console.log('we change',id,value,thisSelectedNode,oldNodeId);
          thisSelectedNodeName = Object.keys(chart.nodes).filter(node => {
          if (node === oldNodeId) {
            return node
          }
          })
          thisSelectedNode.id = value
            break;
          default:
          console.log("default happening");
        }
        if (thisSelectedNode) {
        thisChart.nodes[thisSelectedNodeName[0]] = thisSelectedNode
        thisProject.projectJson = thisChart
        setChart({...chart, ...thisChart})
        }
        setProject({...project, ...thisProject})
      }
      const handleConfigureNode = (e) => {
        setNewItemCreate(true)
        // console.log(e)
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
         console.log(chart.selected);
         if (chart.selected.type === 'node') {
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

      // TODO: WE CANNOT REMOVE A PORT THAT IS CONNECTED!!!
      //
      // if (chart.links) {
      //   let thisLinkedNode = Object.keys(chart.links).filter(link => {
      //     if (chart.links[link].from.nodeId === chart.selected.id || chart.links[link].to.nodeId === chart.selected.id) {
      //       return link
      //     }
      //   })
      //   console.log("WE HAVE A LINKED NODE",chart.links[thisLinkedNode[0]]);
      // }
      console.log(port)
      let ports = newItem.ports
      let allPorts = Object.keys(ports)
      let temp = delete ports[port]
      console.log(temp,ports);
      setNewItem({...newItem,ports:{...ports}})
    }

    const handlePrint = () => {
      console.log(flowchartRef.current);

     //  return print(){
     //   window.print()
     // }

    }
    const handleSelected = selectedNodeObject => {
      let selected = selectedNodeObject
      if (selectedNodeObject.id === "") {
          selected = {}
      }
      console.log(selected);
        setChart({...chart, selected: selected})
    }

    const handleShowHideRight = () => {
      let state = !showHidePanelRight
      console.log(state,showHidePanelRight);
      setShowHidePanelRight(state)
    }
    const handleShowHide = () => {
      let state = !showHidePanel
      setShowHidePanel(state)
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
          connected:false,
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
                {
                  //   <MerMaid />
                  //   <NodeList />
                  // </LeftPanel>
                  // {console.log(flowchartRef)}
                }
                  <LeftPanel
                    project={project}
                    chart={chart}
                    handleChange={handleChange}
                    handleSelected={handleSelected}
                    handleShowHide={handleShowHide}
                    showHidePanel={showHidePanel}
                  />
                  <RightPanel
                    newItem={newItem}
                    itemRef={itemRef}
                    chart={chart}
                    chartRef={flowchartRef}
                    handleSave={handleSave}
                    handleAddPort={handleAddPort}
                    handleDeletePort={handleDeletePort }
                    handleChange={handleChange}
                    handlePrint={handlePrint}
                    handleClose={() =>setNewItemCreate(false)}
                    selected={chart.selected}
                    handleShowHideRight={handleShowHideRight}
                    showHidePanelRight={showHidePanelRight}
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
// <ProjectObtions />
// <RightPanel >
// </RightPanel>
export default ProjectView
