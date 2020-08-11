import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject, apiUrl,uploadProjectData } from '../../tools/fetchApi'
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

let item = (nodeNr) => {
return({
  id: `node${nodeNr}`,
  type: "node",
  name: `node${nodeNr}`,
  text: 'Your Node Description',
  displayType: "screen",
  path: "/no_image.png",
  picture: "no_image.png",
  position: {
    x: 300,
    y: 100,
    height:39,
    width:146.7
  },
  size:{width:500,height:353},
  ports: {
    port1:{
      connected: false,
      from: "",
      id: "port1",
      position: {x: 250, y: 353},
      properties: {},
      to: "",
      type: "output"
    },
    port2: {
      connected: false,
      from: "",
      id: "port2",
      position: {x: 250, y: 353},
      properties: {},
      to: "",
      type: "input",

    }
  }
})
}

const ProjectView = (props) => {
      const myprojectName = props.projectName.slice(1)
      const apiUrl = `loadProject/:${myprojectName}`
      const loadProject = useFetchApi(apiUrl)
      const [error,setError] = useState(null)
      const [isLoaded,setIsLoaded]= useState(false)
      const [project,setProject] = useState()
      const [chart, setChart] = useState(emptyProject)
      const [links, setLinks] = useState({})
      const [showHidePanel,setShowHidePanel] = useState(true)
      const [showHidePanelRight,setShowHidePanelRight] = useState(true)
      const [newItem,setNewItem]= useState(()=>item(0))
      const [newItemCreate,setNewItemCreate]= useState(false)
      const itemRef = React.createRef();
      const flowchartRef = React.createRef();
      const uploadRef = React.createRef();

      useEffect(() => {
        if (loadProject.length === 0) {
          let temp = emptyProject(myprojectName)
          setProject(temp)
          setChart(temp.projectJson)
          setLinks(temp.projectJson.links)
          setIsLoaded(true)
        }
        else if (loadProject) {
          if (loadProject.projectJson) {
            setProject(loadProject)
            setChart(loadProject.projectJson)
            setLinks(loadProject.projectJson.links)
            setIsLoaded(true)
          }
          else {
            let temp = emptyProject(myprojectName)
            setProject(temp)
            setChart(temp.projectJson)
            setLinks(temp.projectJson.links)
            setIsLoaded(true)
          }
        }
      },[loadProject])

      // const handleSelected = () =>{
      //    // console.log("yes")
      //  }
       useEffect(()=>{
         if (chart.selected) {
         if (!chart.selected.type) {
           // // console.log("NOTHING SELECTED:",item);
           setNewItem(item)
         }
         else if (chart.selected.type === 'node'){
           // // console.log('we have selected', chart.selected.id);
           let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
             if (node === chart.selected.id) {
               return node
             }
           })
           // // console.log("the selected node",chart.nodes[thisSelectedNode[0]]);
           setNewItem(chart.nodes[thisSelectedNode[0]])
         }
         else if (chart.selected.type === 'link'){
           let thisSelectedLink = Object.keys(chart.links).filter(mylink => {
             if (mylink === chart.selected.id) {
               return mylink
             }
           })
           // console.log('we have selected',chart.links,chart.links[thisSelectedLink],chart.selected, chart.selected.id, chart.selected.type);
           setNewItem(item)
         }
         }
         // console.log('updateChart');
       },[chart])

       // TODO if a link is deleted the connector status must be updated to unconnected
       // useEffect(()=>{
         // // console.log(links);
         // // console.log('updateChart links list');
         // updateConnectors(links)
       // },[links])

       // const updateConnectors = (links) => {
        //  let temp = chart.nodes
        //  let thisLink = Object.keys(links).filter(mylink => {
        //    let oneNode = Object.keys(temp).filter( thisNode => temp[thisNode].id === links[mylink].from.nodeId)
        //    // console.log(links[mylink].from.nodeId,Object.keys(temp).includes(links[mylink].from.nodeId),temp[Object.keys(temp).filter( thisNode => temp[thisNode].id === links[mylink].from.nodeId)])
        //   Object.keys(temp).filter(thisNode => {
        //     if (temp[thisNode].id != links[mylink].from.nodeId || temp[thisNode].id != links[mylink].to.nodeId)
        //    {
        //     // console.log("insideIF",temp[oneNode], oneNode)
        //     return oneNode
        //   }
        //   }
        // )}
        // )
        //  // console.log(temp,thisLink,links);
        //   // // console.log(temp,links);
       // }

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
        // console.log(event.currentTarget.id,event.currentTarget.value,nodeId)
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
          // console.log('we change',id,thisSelectedNode);
          thisSelectedNode.name = value
            break;
          case 'changeNodeDescription':
          // console.log('we change',id,thisSelectedNode);
          thisSelectedNode.text = value
            break;
          case 'changeNodeImage':
          // console.log('we change',id, "TODO: Upload new file and remove the old one");
                // console.log(event.currentTarget, uploadRef);
                uploadRef.current.click();
            break;
          case 'changeProjectName':
          // console.log('we change',id,value,thisSelectedNode);
          thisProject.name = value
            break;
          case 'changeProjectDescription':
          // console.log('we change',id,value,thisSelectedNode);
          thisProject.description = value
            break;
          case 'changeNodeId':
          // console.log('we change',id,value,thisSelectedNode,oldNodeId);
          thisSelectedNodeName = Object.keys(chart.nodes).filter(node => {
          if (node === oldNodeId) {
            return node
          }
          })
          thisSelectedNode.id = value
            break;
          default:
          // console.log("default happening");
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
        // // console.log(e)
      }

      const stateActionsCallbacks = Object.keys(actions).reduce((obj,key,idx) => {
         obj[key] = (...args)=>{
           let action = actions[key];
           let newChartTransformer = action(...args);
           let newChart = newChartTransformer(chart);
           setChart({...chart, ...newChart});
           setLinks({...chart.links,...newChart.links})
           return newChart;
       };
       return obj;
     },{})
     //
     useEffect(() => {
       if (chart.selected) {
         // console.log(chart.selected);
         if (chart.selected.type === 'node') {
         let name = chart.selected.id
         // // console.log("the selected node",chart);
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

     const changePicture = (e) => {
       let picName = e.currentTarget.files[0].name
       let saveChart = chart
       saveChart.nodes[newItem.id].picture = picName
       saveChart.nodes[newItem.id].path = `${myprojectName}/${picName}`
       setChart({...saveChart})
       // console.log(e.currentTarget.files,newItem,chart);
       var formData = new FormData();
       let files = e.currentTarget.files
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i])
         formData.append('filename',files[i].name)
       }

       formData.append('projectName',myprojectName)
       uploadProjectData(formData,myprojectName).then(result =>{
         // console.log("DONE",result);
         handleSave()
         // setChart(result[myprojectName].projectJson)
       } ,(error) => {
         // console.log("ERROR",error);
             })
     }


    const handleDeletePort = port => {

      // TODO: WE CANNOT REMOVE A PORT THAT IS CONNECTED!!!
      //
      // if (chart.links) {
      //   let thisLinkedNode = Object.keys(chart.links).filter(link => {
      //     if (chart.links[link].from.nodeId === chart.selected.id || chart.links[link].to.nodeId === chart.selected.id) {
      //       return link
      //     }
      //   })
      //   // console.log("WE HAVE A LINKED NODE",chart.links[thisLinkedNode[0]]);
      // }
      // console.log(port)
      let ports = newItem.ports
      let allPorts = Object.keys(ports)
      let temp = delete ports[port]
      // console.log(temp,ports);
      setNewItem({...newItem,ports:{...ports}})
    }

    const handlePrint = () => {
      // console.log(flowchartRef.current);

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

    const createNewNode = (e) => {
      let thisChart = chart
      console.log(thisChart);
      let nodeCount = Object.keys(thisChart.nodes).length
      let newcount = nodeCount+1
      console.log(nodeCount,newcount);
      let myNewitem = item(newcount)
      let newName = `node${newcount}`
      myNewitem.id = `${newName}`
      myNewitem.name = `New ${newName}`
      thisChart.nodes = {...thisChart.nodes,[newName]:myNewitem}
      console.log(thisChart,myNewitem);
      // thisChart.nodes

      setChart({...chart,...thisChart})
    }
    const handleShowHideRight = () => {
      let state = !showHidePanelRight
      // console.log(state,showHidePanelRight);
      setShowHidePanelRight(state)
    }
    const handleShowHide = () => {
      let state = !showHidePanel
      setShowHidePanel(state)
    }

    const handleChangePortLabel = (e,port) => {
      let temp = newItem
      let myValue = e.currentTarget.value
      let myChart = chart
      temp.ports[port].properties.value = myValue
      let tempLinks = links
      let otherNode
      let fromLink = Object.keys(tempLinks).filter(link => {
          if (tempLinks[link].from.portId === port && chart.selected.id === tempLinks[link].from.nodeId) {
            return link
          }
        })
        let toLink = Object.keys(tempLinks).filter(link => {
            if (tempLinks[link].to.portId === port && chart.selected.id === tempLinks[link].to.nodeId) {
              return link
            }
          })
          if (toLink.length > 0) {
            tempLinks[toLink[0]].properties.label = myValue
            // otherNode = myChart.nodes[tempLinks[toLink[0]].from.nodeId]
            // console.log(otherNode.ports[tempLinks[toLink[0]].from.portId].properties.value);
            myChart.nodes[tempLinks[toLink[0]].from.nodeId].ports[tempLinks[toLink[0]].from.portId].properties.value = myValue

          }
          if (fromLink.length > 0) {
            tempLinks[fromLink[0]].properties.label = myValue
            console.log(tempLinks[fromLink[0]]);
            // otherNode = myChart.nodes[tempLinks[fromLink[0]].to.nodeId]
            // console.log(otherNode.ports[tempLinks[fromLink[0]].to.portId].properties.value);
            myChart.nodes[tempLinks[toLink[0]].from.nodeId].ports[tempLinks[fromLink[0]].to.portId].properties.value = myValue
          }

        console.log(fromLink,toLink);
        setChart({...myChart,links: {...tempLinks}})
        // setLinks({...tempLinks})
        setNewItem({...temp})
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
        // console.log(portAmount);
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
          // console.log('change Portname:',newItem);
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
                  // {// console.log(flowchartRef)}
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
                    handleChangePortLabel={handleChangePortLabel}
                    handlePrint={handlePrint}
                    handleClose={() =>setNewItemCreate(false)}
                    selected={chart.selected}
                    handleShowHideRight={handleShowHideRight}
                    showHidePanelRight={showHidePanelRight}
                    uploadRef={uploadRef}
                    changePicture={changePicture}
                    createNewNode={createNewNode}
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
