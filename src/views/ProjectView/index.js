import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { saveProject, uploadProjectData } from '../../tools/fetchApi'

import MyFlowChart from '../../components/FlowChart'
  import RightPanel from '../../components/RightPanel'
import LeftPanel from '../../components/LeftPanel'
import useFetchApi from '../../tools/fetchApi/useFetchApi.js'

// import NewItemOverlay from '../../components/newItemOverlay'
import { actions } from "@mrblenny/react-flow-chart";
// import { cloneDeep, mapValues } from 'lodash'

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

let item = (nodeNr,typeId) => {
  let type = 'screen'
  let ports = {port1:{id:"port1",type:'input',properties:{value:"nolabel"}},port2:{id:"port2",type:'output',properties:{value:"nolabel"}}}
  switch (typeId) {
    case "addNewNode":
      type = 'screen'
      break;
    case "addNewDecisionNode":
      type = 'decision'
      ports = {port1:{id:"port1",type:'input',properties:{value:"nolabel"}},port2:{id:"port2",type:'output',properties:{value:"no"}},port3:{id:"port3",type:'output',properties:{value:"yes"}}}
      break;
    case "addNewPointNode":
      type = 'point'
      break;
    default:
      type = 'screen'
  }

  function portConstructor(ports){
    if (ports.length >= 1) {
      Object.keys(ports).map(port =>{
        console.log(port);
       ports[port] = {
        connected: false,
        from: "",
        id: ports[port].id,
        position: {x: 250, y: 353},
        properties: {value:ports[port].properties.value?ports[port].properties.value:"nolabel"},
        to: "",
        type: ports[port].type?ports[port].type:"input",
        }
      return port
      })
    }
   return ports
  }


  let myNodeConstructor = {
    id: `node${nodeNr}`,
    type: "node",
    name: `node${nodeNr}`,
    text: 'Your Node Description',
    displayType: type,
    path: "/no_image.png",
    picture: "no_image.png",
    picId:`node${nodeNr}_picId`,
    position: {
      x: 300,
      y: 100,
      height:39,
      width:146.7
    },
    size:{width:500,height:353},
    ports: portConstructor(ports)
  }
  return myNodeConstructor
}

const ProjectView = (props) => {
      const {setProjectName} = props;
      const {projectName} = useParams()
      const apiUrl = `loadProject/${projectName}`
      const loadProject = useFetchApi(apiUrl)
      const [error,setError] = useState(null)
      const [isLoaded,setIsLoaded]= useState(false)
      const [project,setProject] = useState()
      const [chart, setChart] = useState(emptyProject)
      const [links, setLinks] = useState({})
      const [showHidePanelRight,setShowHidePanelRight] = useState(true)
      const [newItem,setNewItem]= useState(()=>item(0))
      const [smartRouting,setSmartRouting]= useState(false)

      const itemRef = React.createRef();
      const flowchartRef = React.createRef();
      const uploadRef = React.createRef();

      useEffect(() => {

        if (loadProject.length === 0) {
          let temp = emptyProject(projectName)
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
            let temp = emptyProject(projectName)
            setProject(temp)
            setChart(temp.projectJson)
            setLinks(temp.projectJson.links)
            setIsLoaded(true)
          }
        }
        setProjectName(`${projectName.substring(1)}`)
      },[loadProject,projectName])

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
           setNewItem(chart.nodes[thisSelectedNode[0]])
         }
         else if (chart.selected.type === 'link'){
          let thisSelectedLink = Object.keys(chart.links).filter(mylink => {
             if (mylink === chart.selected.id) {
               return mylink
             }
           })
           console.log("we have alink", thisSelectedLink);
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
        // console.log("itemRef and UploadRef from handleChange",flowchartRef,itemRef.current,event.target.clientHeight,uploadRef.current);
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
         if (chart.selected.type === 'node') {
           let saveChart = chart
           let name = saveChart.selected.id
           let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
             if (node === name) {
               return node
              }
            })
           let saveNewItem = newItem
           let thisItem = saveChart.nodes[thisSelectedNode[0]]
           thisItem.ports = saveNewItem.ports
           saveChart.nodes[thisSelectedNode[0]] = thisItem
           setNewItem(thisItem)
        }
       }
     },[newItem])

     const changePicture = (e) => {
       let picName = e.currentTarget.files[0].name
       let saveChart = chart
       let picId = ''
       console.log("itemRef and UploadRef from changePciture handler",itemRef,uploadRef);
       if (!saveChart.nodes[newItem.id].picId) {
       picId = `${saveChart.nodes[newItem.id].id}_picId`
       }
       else {
         picId = saveChart.nodes[newItem.id].picId
       }

       picName = picName.split(' ').join('-')
       saveChart.nodes[newItem.id].picId = picId
       saveChart.nodes[newItem.id].picture = picName
       saveChart.nodes[newItem.id].path = `${projectName}/${picName}`
       setChart({...saveChart})
       // console.log(e.currentTarget.files,newItem,chart);
       var formData = new FormData();
       let files = e.currentTarget.files
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i])
         formData.append('filename',files[i].name)
       }

       formData.append('projectName',projectName)
       uploadProjectData(formData,projectName).then(result =>{
         // console.log("DONE",result);
         handleSave()
         // setChart(result[projectName].projectJson)
       } ,(error) => {
         // console.log("ERROR",error);
             })
     }


    const handleDeletePort = port => {
      if (chart.links) {
        let thisLinkedNode = Object.keys(chart.links).filter(link => {
          if (chart.links[link].from.nodeId === chart.selected.id || chart.links[link].to.nodeId === chart.selected.id) {
            return link
          }
        })
        let temp = chart.links
        delete temp[thisLinkedNode[0]]
      }
      let ports = newItem.ports
      delete ports[port]
      let temp = ports
      setNewItem({...newItem,ports:{...temp}})
    }

    const handlePrint = () => {
    }

    const handleSelected = selectedNodeObject => {
      let selected = selectedNodeObject
      if (selectedNodeObject.id === "") {
          selected = {}
      }
      // console.log(selected,itemRef);
        setChart({...chart, selected: selected})
    }

    const createNewNode = (e) => {
      let thisChart = chart
      let div = flowchartRef.current
      const centerX = div.offsetWidth / 2 - chart.offset.x;
      const centerY = div.offsetHeight / 2 - chart.offset.y;
      const deltaX = centerX/chart.scale
      const deltaY = centerY/chart.scale
      let nodeCount = Object.keys(thisChart.nodes).length
      let newcount = nodeCount+1
      let myNewitem = {}
      let newName = `node${newcount}`
      // console.log("see my new noede",nodeCount,newcount,e.currentTarget.id,e);
      myNewitem = item(newcount,e.currentTarget.id)
      myNewitem.id = `${newName}`
      myNewitem.picId = `${newName}_picId`
      myNewitem.name = `New ${newName}`
      myNewitem.position.x = deltaX
      myNewitem.position.y = deltaY
      thisChart.nodes = {...thisChart.nodes,[newName]:myNewitem}
      // console.log("see my new item now",myNewitem);
      setChart({...chart,...thisChart})
    }
    const handleShowHideRight = () => {
      let state = !showHidePanelRight
      // console.log(state,showHidePanelRight);
      setShowHidePanelRight(state)
    }

    const handleChangeSmartRouting = () => {
      console.log("we chagne the smartRouting", smartRouting);
      setSmartRouting(!smartRouting)
    }
    useEffect(()=>{
      console.log("we want to rerender", smartRouting);
      setChart(chart=>(chart={...chart}))
    },[smartRouting])

    const handleChangePortLabel = (e,port) => {
      let temp = newItem
      let myValue = e.currentTarget.value
      let myChart = chart
      temp.ports[port].properties.value = myValue
      let tempLinks = links

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
        if (!tempLinks[toLink[0]].properties) {
          tempLinks[toLink[0]].properties = {label:'none'}
        }
        tempLinks[toLink[0]].properties.label = myValue
        if (tempLinks[toLink[0]].from.nodeId) {
          myChart.nodes[tempLinks[toLink[0]].from.nodeId].ports[tempLinks[toLink[0]].from.portId].properties.value = myValue
        }
      }
      if (fromLink.length > 0) {
        if (!tempLinks[fromLink[0]].properties) {
          tempLinks[fromLink[0]].properties = {label:'none'}
        }
        // console.log(tempLinks,fromLink[0],tempLinks[fromLink[0]],myChart.nodes)
        tempLinks[fromLink[0]].properties.label = myValue
        if (tempLinks[fromLink[0]].to.nodeId) {
          myChart.nodes[tempLinks[fromLink[0]].to.nodeId].ports[tempLinks[fromLink[0]].to.portId].properties.value = myValue
        }
      }
      // setNewItem({...temp})
      setChart({...myChart})
      setLinks({...tempLinks})
    }

    const handleImageHeight = e => {
      let thisNode = e.target.id.split('_')[0]
      if (chart.nodes[thisNode].picSize) {
      if (chart.nodes[thisNode].picSize.height !== e.target.clientHeight) {
        console.log(thisNode,e.target.clientHeight);
        chart.nodes[thisNode].picSize = {height: e.target.clientHeight, width:chart.nodes[thisNode].size.width}
      }
      }
      else {
        chart.nodes[thisNode].picSize = {height: e.target.clientHeight, width:chart.nodes[thisNode].size.width}
      }
      // Object.keys(chart.nodes).filter(node => {
      //     if (node === thisNode && chart.nodes[node]) {
      //       chart.nodes[node].picSize = {height: e.target.clientHeight, width:chart.nodes[node].size.width}
      //     }
      //   })
    }

    const handleAddPort  = event => {
        let id = event.currentTarget.id
        let portAmount = Object.keys(newItem.ports)
        console.log(portAmount);
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
                    createNewNode={createNewNode}
                    handleSave={handleSave}
                    handlePrint={handlePrint}
                  />
                  <RightPanel
                    newItem={newItem}
                    itemRef={itemRef}
                    chart={chart}
                    project={project}
                    handleChange={handleChange}
                    handleSelected={handleSelected}
                    handleChangeSmartRouting={handleChangeSmartRouting}
                    smartRouting={smartRouting}
                    chartRef={flowchartRef}
                    handleAddPort={handleAddPort}
                    handleDeletePort={handleDeletePort }
                    handleChangePortLabel={handleChangePortLabel}
                    handlePrint={handlePrint}
                    selected={chart.selected}
                    handleShowHideRight={handleShowHideRight}
                    showHidePanelRight={showHidePanelRight}
                    uploadRef={uploadRef}
                    changePicture={changePicture}

                  />
                  <MyFlowChart
                    id={'projectFlowGraph'}
                    stateActions={stateActionsCallbacks}
                    ref={flowchartRef}
                    chartData={chart}
                    smartRouting={smartRouting}
                    handleImageHeight={handleImageHeight}
                    />
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
