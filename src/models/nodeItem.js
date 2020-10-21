
const nodeItem = (nodeNr,typeId) => {
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

export default nodeItem
