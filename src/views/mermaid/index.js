import React from 'react';
import {
  getFiles,
  loadFiles
} from '../../components/fetchApi'
import mermaid from 'mermaid'
import {
  SvgLoader,
  SvgProxy
} from 'react-svgmt';
import FlowChart from '../../components/FlowChart'

// Array.prototype.forEach.call(els, function(el) {
//     // Do stuff here
//     console.log(el.tagName);
// });
//
// String.prototype.replaceAll = function(f, r) {
//   return this.split(f).join(r);
// }

const convertPolyToPath = (poly) => {
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS, 'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0 = points.shift(),
    y0 = points.shift();
  var pathdata = 'M' + x0 + ',' + y0 + 'L' + points.join(' ');
  if (poly.tagName == 'polygon') pathdata += 'z';
  path.setAttribute('d', pathdata);
  path.setAttribute('id', 'test');
  poly.parentNode.replaceChild(path, poly);
  return
}


const getSvgContent = (svg) => {
  const domparser = new DOMParser();
  svg = domparser.parseFromString(svg, 'image/svg+xml')
  console.log(svg);
  return svg
  // const serializer = new XMLSerializer();
  // return Array.prototype.slice.call(svg.childNodes).map(node => serializer.serializeToString(node)).join('');
};

const setSvgContent = (svg) => {
  const serializer = new XMLSerializer();
  return Array.prototype.slice.call(svg.childNodes).map(node => serializer.serializeToString(node)).join('');
};

const nodeIdAsPng = (toSearch, objects) => {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].name === toSearch) {
      return objects[i].name
    }
  }
}

const mmdConfig = {
  startOnLoad: true,
  theme: 'forest',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false,

  },
  securityLevel: 'loose',
};

const getPorts = (allConnections, tree, counter) => {

  let ports = {}
  let portcounter = 1
  allConnections.forEach((node, i) => {
    console.log(node, tree, counter)
    console.log("WE GET THE PORTS NOW:", node, "in the hole tree:", tree[counter])

    let from = Object.filter(tree,thisnode => {
      console.log("our node name",node.id,node,node.name)
      return node.from.includes(thisnode.name)
    })

    let to = tree.filter(thisnode => {
      // console.log(node.name)
      return node.to.includes(thisnode.name)
    })


    let id
    let ob = {}
    if (tree[counter].id.includes(from[0].id)) {
      let portname = portcounter
      console.log(tree[counter].ports.port1,portname, Object.keys(tree[counter]).length, tree[counter]);
      id = `port${portname}`
      ob = {
        from: node.from,
        to: node.to,
        id,
        type: 'output'
      }

      ports[`port${portname}`] = ob
      tree[counter].ports = ob
      console.log(tree[counter], ob); // console.log(ports);
      portcounter++
    }
    if (tree[counter].id.includes(to[0].id)) {
      let portname = portcounter
      if (tree[counter].ports.port1) {
        portname = Object.keys(tree[counter].ports).length + 1
      }
      console.log(ports,portname);

      id = `port${portname}`
      ob = {
        from: node.from,
        to: node.to,
        id,
        type: 'input'
      }
      ports[`port${portname}`] = ob
      tree[counter].ports = ob
      portcounter++
    }

  })
  return ports
}

const makelinks = (allConnections, tree, counter) => {

  let links = {}
  Array.from(allConnections).forEach((node, i) => {
    console.log(node, tree, counter)
    console.log("WE MAKE THE LINKS NOW:", node, "in the hole tree:")

    let from = Object.filter(tree,thisnode => {
      // console.log(node.name)
      return node.from.includes(thisnode.name)
    })

    let to = tree.filter(thisnode => {
      // console.log(node.name)
      return node.to.includes(thisnode.name)
    })
    let linkname = i + 1
    let id
    let ob = {}
    id = `link${linkname}`
    let fromDirectionPort, toDirectionPort = ''
    for (var variable in from[0].ports) {
      if (from[0].ports.hasOwnProperty(variable)) {
        if (from[0].ports[variable].type === 'input') {
          console.log("FROM INPUT",variable,from[0].ports[variable]);
          fromDirectionPort = from[0].ports[variable].id

        }
        if (from[0].ports[variable].type === 'output') {
          console.log('FROM OUTPUT',variable,from[0].ports[variable]);
          fromDirectionPort = from[0].ports[variable].id
        }

      }
    }
    // for (var variable in to[0].ports) {
    //   if (to[0].ports.hasOwnProperty(variable)) {
    //     if (to[0].ports[variable].type === 'input') {
    //       console.log("TO INPUT",variable,to[0].ports[variable]);
    //       toDirectionPort = to[0].ports[variable].id
    //
    //     }
    //     if (to[0].ports[variable].type === 'output') {
    //       console.log('TO OUTPUT',variable,to[0].ports[variable]);
    //       toDirectionPort = to[0].ports[variable].id
    //     }
    //
    //   }
    // }

    ob = {
      id,
      from: {
        nodeId: from[0].id,
        portId: fromDirectionPort
      },
      to: {
        nodeId: to[0].id,
        portId: to[0].ports.port1.id
      }
    }
    console.log(links);
    links = {
      ...links,
      [`link${linkname}`]: ob
    }

  })
  return links
}

class MerMaidProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      png: [],
      svgs: [],
      mmd: [],
      htmlGraph: [],
      reactGraph: {}
    }
    this.getFiles = getFiles.bind(this);
    this.loadFiles = loadFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let response = {}
    this.getFiles(this.state).then(
      (result) => {
        response = {
          error: null,
          isLoaded: true,
          png: result.png,
          svgs: result.svgs,
          mmd: result.mmd,
          htmlGraph: [],
          reactGraph: {}
        };
        const newState = {
          ...this.state,
          ...response
        }
        // console.log(newState);
        this.setState(newState)
        if (newState.mmd.length > 0) {
          // console.log('hello we are here', newState.mmd);
          this.loadFiles('mmd').then(
            (result) => {
              // console.log(result)
              mermaid.initialize(mmdConfig)
              result.mmd.map((thismmd, key) => {
                let container = `mermaid${key}`
                let temp = thismmd.data //.join('/n') once i needed it ... strange
                let ttemp = temp.split(/\r?\n/g)
                let allConnections = []

                ttemp.map((ob, key) => {
                  let mytemp = ob.split('-->')
                  let from, id, to
                  let port = {}
                  let ports = {}
                  if (key != 0) {
                    // console.log(key,ob);
                    from = mytemp[0].replace(/\s/g, '')
                    if (from != '') {
                      if (mytemp[1]) {
                        to = mytemp[1].replace(/\s/g, '')
                      }
                      port = {
                        from,
                        to,
                        id
                      }


                      allConnections.push(port)
                    }
                  }
                })
                console.log(allConnections);

                let test = mermaid.render(container, temp, cb => {
                  let mysvgTree = getSvgContent(cb)
                  let htmlGraph = []
                  let mynodes = mysvgTree.getElementsByClassName('node')
                  let counter = 0

                  Array.from(mynodes).forEach((el, i) => {
                    counter = counter + 1
                    let myHtmlnode = {
                      id: `node${counter}`,
                      type: '',
                      picture: '',
                      text: '',
                      path: '',
                      position: {
                        x: 0,
                        y: 0,
                        transform: '',
                        width: 0,
                        height: 0
                      },
                      ports: {

                      }
                    }
                    let children = el.childNodes
                    // console.log(children);
                    // for (var j = 0; j < children.length; j++) {
                    Array.from(children).forEach(child => {
                      console.log(child,el);
                      myHtmlnode.name = el.id
                      myHtmlnode.text = el.getElementsByTagName('tspan')[0].textContent
                      let nodeTransforms = el.getAttribute('transform')
                      // console.log(nodeTransforms.substring(10));
                      let transFromsToXY = nodeTransforms.substring(10)
                      transFromsToXY = transFromsToXY.substring(0, transFromsToXY.length - 1)
                      transFromsToXY = transFromsToXY.split(',')
                      // console.log(transFromsToXY)
                      let temp = nodeTransforms.split(',')
                      let first = temp[0] + 'px, '
                      let second = temp[1]
                      second = second.substring(0, second.length - 1) + 'px)'
                      nodeTransforms = first + second


                      switch (child.nodeName) {
                        case 'rect':
                          // console.log('have a rect',child);
                          myHtmlnode.position.x = Math.abs(child.getAttribute('x'))
                          myHtmlnode.position.y = Math.abs(child.getAttribute('y'))
                          if (transFromsToXY[0]) {
                            myHtmlnode.position.x = (+myHtmlnode.position.x + +transFromsToXY[0]) * 2.5
                          }
                          if (transFromsToXY[1]) {
                            myHtmlnode.position.y = (+myHtmlnode.position.y + +transFromsToXY[1]) * 2.5
                          }
                          console.log(myHtmlnode.position);
                          myHtmlnode.position.width = child.getAttribute('width')
                          myHtmlnode.position.height = child.getAttribute('height')
                          myHtmlnode.position.transform = nodeTransforms
                          myHtmlnode.type = 'screen'
                          console.log(children);

                          if (nodeIdAsPng(el.id, result.png) === el.id) {
                            myHtmlnode.picture = el.id
                          }
                          break;

                        case 'polygon':

                          myHtmlnode.position.x = 0
                          myHtmlnode.position.y = 0
                          if (transFromsToXY[0]) {
                            myHtmlnode.position.x = (+myHtmlnode.position.x + +transFromsToXY[0]) * 2.5
                          }
                          if (transFromsToXY[1]) {
                            myHtmlnode.position.y = (+myHtmlnode.position.y + +transFromsToXY[1]) * 2.5
                          }
                          myHtmlnode.position.width = 100
                          myHtmlnode.position.height = 100
                          myHtmlnode.position.transform = nodeTransforms + ' rotate(45deg)'
                          myHtmlnode.type = 'decision'
                          break;
                        case 'g':

                          break;

                        default:

                      }
                      myHtmlnode.path = `http://localhost:4000/images/iaa/${myHtmlnode.name}.png`
                    })

                    htmlGraph.push(myHtmlnode)
                  })

                  Array.from(htmlGraph).forEach((graphItem, j) => {
                    graphItem.ports = getPorts(allConnections, htmlGraph, j)
                  })


                  let reactGraph = {}
                  let mytempnodes = {}
                  reactGraph.offset = {}
                  reactGraph.offset.x = 0
                  reactGraph.offset.y = 0
                  reactGraph.nodes = {}
                  reactGraph.links = makelinks(allConnections, htmlGraph)
                  reactGraph.selected = {}
                  reactGraph.hovered = {}
                  let counter2 = 0
                  console.log(reactGraph.links)

                  Array.from(htmlGraph).forEach((item, i) => {
                    // item.ports = allConnections[i]
                    let identifier = `node${i+1}`
                    // item.name = item.id
                    item.id = identifier

                    mytempnodes[identifier] = item


                  })
                  reactGraph.nodes = mytempnodes
                  console.log(reactGraph);

                  let readySvg = setSvgContent(mysvgTree)
                  if (response.mmd[key].data !== temp) {
                    response.mmd[key].data = []
                  }
                  response.htmlGraph = htmlGraph
                  response.mmd[key].data = thismmd.data
                  response.mmd[key].svg = readySvg
                  response.reactGraph = reactGraph

                  return readySvg
                })

              })
              const supernewState = {
                ...response
              }
              this.setState(supernewState)
            },
            (error) => {
              response = {
                isLoaded: true,
                error
              }
            }
          )
        }
        window.callback = e => console.log(e)
        mermaid.contentLoaded()
      },
      (error) => {
        response = {
          isLoaded: true,
          error
        }
        // console.log(response)
        this.setState(response)
      }
    )

  }

  handleClick() {
    console.log("yes")
  }


  render() {
    const {
      error,
      isLoaded,
      png,
      svgs,
      mmd,
      htmlGraph
    } = this.state;
    console.log(this.state);

    if (error) {
      return <div > Error: {
        error.message
      } < /div>;
    } else if (!isLoaded) {
      return <div > Loading... < /div>;
    } else {
      return ( <
        > {
          this.state.reactGraph.nodes ? ( <
            FlowChart chartData = {
              this.state.reactGraph
            }
            />
          ) : (null)
        } <
        />

      );
    }
  }
}

export default MerMaidProject
