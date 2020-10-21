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

export default emptyProject
