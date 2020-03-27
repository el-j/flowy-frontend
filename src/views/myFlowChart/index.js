import React from 'react';
import { getFiles, loadFiles } from '../../components/fetchApi'
import mermaid from 'mermaid'
import { SvgLoader, SvgProxy } from 'react-svgmt';
import FlowChart from '../../components/FlowChart'

// Array.prototype.forEach.call(els, function(el) {
//     // Do stuff here
//     console.log(el.tagName);
// });

String.prototype.replaceAll = function(f,r){return this.split(f).join(r);}

const convertPolyToPath = (poly) =>{
  var svgNS = poly.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0=points.shift(), y0=points.shift();
  var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  path.setAttribute('id','test');
  poly.parentNode.replaceChild(path,poly);
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

const nodeIdAsPng = (toSearch,objects) => {
    for(let i=0; i<objects.length; i++) {
        if(objects[i].name === toSearch) {
          return objects[i].name
        }
    }
  }

  const intersectRect = (r1, r2) => {
    console.log(r1,r2);
      var r1 = r1.getBBox();    //BOUNDING BOX OF THE FIRST OBJECT
      var r2 = r2.getBBox();    //BOUNDING BOX OF THE SECOND OBJECT
      console.log(r1,r2);
      //CHECK IF THE TWO BOUNDING BOXES OVERLAP
    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

const mmdConfig = {
    startOnLoad:true,
    theme: 'forest',
    flowchart:{
      useMaxWidth:true,
      htmlLabels:false,

    },
    securityLevel:'loose',
  };

const changeRect = () => {
    console.log('test');
  }

class MerMaidProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      png: [],
      svgs:[],
      mmd:[],
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
          svgs:result.svgs,
          mmd:result.mmd,
          htmlGraph: [],
          reactGraph: {}
        };
        const newState = {... this.state ,...response}
        // console.log(newState);
          this.setState(newState)
          if (newState.mmd.length > 0 ) {
            // console.log('hello we are here', newState.mmd);
            this.loadFiles('mmd').then(
              (result) => {
                // console.log(result)
                mermaid.initialize(mmdConfig)
                result.mmd.map((thismmd,key) => {
                  let container = `mermaid${key}`
                  let temp = thismmd.data //.join('/n') once i needed it ... strange
                  let ttemp = temp.split(/\r?\n/g)
                  let allConnections = []

                  ttemp.map((ob, key) => {
                    let mytemp = ob.split('-->')
                    let from, id, to
                    let myobject = {}
                    if (key != 0) {
                      console.log(key,ob);
                      from = mytemp[0].replace(/\s/g, '')
                      if (from != '') {
                        if (mytemp[1]) {
                          to = mytemp[1].replace(/\s/g, '')
                        }
                        myobject ={
                          port1: {from,to}

                        }
                        allConnections.push(myobject)
                      }
                    }
                  })

                  let test = mermaid.render(container,temp,cb => {
                    let mysvgTree = getSvgContent(cb)
                    let htmlGraph = []
                    let mynodes = mysvgTree.getElementsByClassName('node')
                    Array.from(mynodes).forEach((el, i) => {
                      let myHtmlnode = {
                            id:'',
                            type: '',
                             picture: '',
                             text: '',
                             path: '',
                            position: {
                              x: 0,
                              y: 0,
                              transform: '',
                              width: 0,
                              height:0
                            },
                            ports: {

                            }
                          }
                      let children = el.childNodes
                      console.log(children);
                      // for (var j = 0; j < children.length; j++) {
                      Array.from(children).forEach(child => {
                        myHtmlnode.id = el.id
                        myHtmlnode.text = el.getElementsByTagName('tspan')[0].textContent
                        let nodeTransforms = el.getAttribute('transform')
                        console.log(nodeTransforms.substring(10));
                        let transFromsToXY = nodeTransforms.substring(10)
                        transFromsToXY = transFromsToXY.substring(0, transFromsToXY.length-1)
                        transFromsToXY = transFromsToXY.split(',')
                        console.log(transFromsToXY)
                        let temp = nodeTransforms.split(',')
                        let first = temp[0]+'px, '
                        let second = temp[1]
                        second = second.substring(0,second.length - 1) + 'px)'
                        nodeTransforms = first + second

                        switch (child.nodeName) {
                          case 'rect':
                              // console.log('have a rect',child);
                              myHtmlnode.position.x = Math.abs(child.getAttribute('x'))
                              myHtmlnode.position.y = Math.abs(child.getAttribute('y'))
                              if (transFromsToXY[0]) {
                              myHtmlnode.position.x = +myHtmlnode.position.x + +transFromsToXY[0]
                              }
                              if (transFromsToXY[1]) {
                              myHtmlnode.position.y = +myHtmlnode.position.y + +transFromsToXY[1]
                              }
                              console.log(myHtmlnode.position);
                              myHtmlnode.position.width = child.getAttribute('width')
                              myHtmlnode.position.height = child.getAttribute('height')
                              myHtmlnode.position.transform = nodeTransforms
                              myHtmlnode.type = 'screen'
                                if (nodeIdAsPng(el.id,result.png) === el.id){
                                  myHtmlnode.picture = el.id
                                }
                            break;

                          case 'polygon':

                              myHtmlnode.position.x = 0
                              myHtmlnode.position.y = 0
                                if (transFromsToXY[0]) {
                              myHtmlnode.position.x = +myHtmlnode.position.x + +transFromsToXY[0]
                              }
                              if (transFromsToXY[1]) {
                              myHtmlnode.position.y = +myHtmlnode.position.y + +transFromsToXY[1]
                              }
                              myHtmlnode.position.width = 100
                              myHtmlnode.position.height = 100
                              myHtmlnode.position.transform = nodeTransforms + ' rotate(45deg)'
                              myHtmlnode.type = 'decision'
                            break;
                          case 'g':
                              console.log('have a group',child);
                            break;

                          default:
                          console.log('just default',child);
                        }
                        myHtmlnode.path = `http://localhost:4000/images/iaa/${myHtmlnode.id}.png`
                      })
                      // console.log(el.childNodes);
                      htmlGraph.push(myHtmlnode)
                      })

                      let reactGraph = {}
                      let mytempnodes = {}
                      reactGraph.offset = {}
                      reactGraph.offset.x = 0
                      reactGraph.offset.y = 0
                      reactGraph.nodes = {}
                      reactGraph.links = {}
                      reactGraph.selected= {}
                      reactGraph.hovered= {}
                      let counter = 0

                      Array.from(htmlGraph).forEach((item, i) => {
                        for (var j = 0; j < allConnections.length; j++) {

                          if (allConnections[j].port1.from.includes(item.id)) {
                            item.ports = allConnections[j]
                            let counter = i+1
                            let identifier = `node${counter}`
                            item.name = item.id
                            item.id = identifier

                            let searchit = item.ports.port1.to
                            // if(allConnections[j].port1.from.includes(htmlGraph[i].id)){
                            // item.ports.port1.id = htmlGraph.find((f,i,arr) => {
                            //   console.log("we look for the end",f.ports.port1,i,searchit);
                            //   let temp = f.ports.port1.to
                            //   console.log(temp);
                            //   return (temp)
                            // },searchit)
                          mytempnodes[identifier] = htmlGraph[i]
                            // console.log(identifier,allConnections[j],i,j,htmlGraph.length,allConnections.length);
                          // }
                        }
                      }})


                      reactGraph.nodes =  mytempnodes

                    let readySvg = setSvgContent(mysvgTree)
                    if (response.mmd[key].data !== temp) {
                      response.mmd[key].data = []
                    }
                    response.htmlGraph = htmlGraph
                    response.mmd[key].data = thismmd.data
                    response.mmd[key].svg = readySvg
                    response.reactGraph =  reactGraph

                    return readySvg
                  })

                })
                const supernewState = {...response}
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

  handleClick(){ console.log("yes")}


  render() {
    const { error, isLoaded, png, svgs, mmd,htmlGraph } = this.state;
    // console.log(this.state);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state)
      return (
        <div className='container-fluid'>
                      {this.state.reactGraph.nodes?(
                <FlowChart chartData={this.state.reactGraph}/>
                ):(null)}

        </div>
      );
    }
  }
}

export default MerMaidProject
