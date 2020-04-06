import React, {useState} from 'react';
import { loadProject, loadFiles } from '../../components/fetchApi'
import mermaid from 'mermaid'
import FlowChart from '../../components/FlowChart'

// Array.prototype.forEach.call(els, function(el) {
//     // Do stuff here
//     console.log(el.tagName);
// });

String.prototype.replaceAll = function(f,r){return this.split(f).join(r);}
//
// const convertPolyToPath = (poly) =>{
//   var svgNS = poly.ownerSVGElement.namespaceURI;
//   var path = document.createElementNS(svgNS,'path');
//   var points = poly.getAttribute('points').split(/\s+|,/);
//   var x0=points.shift(), y0=points.shift();
//   var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
//   if (poly.tagName=='polygon') pathdata+='z';
//   path.setAttribute('d',pathdata);
//   path.setAttribute('id','test');
//   poly.parentNode.replaceChild(path,poly);
//   return
// }




// export default const ProjectView = () => {
class ProjectView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        project: {}
      }
      this.loadProject = loadProject.bind(this);
      this.loadFiles = loadFiles.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

  // const [error, setError] = useState(null)
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [htmlGraph, setHtmlGraph] = useState([])
  // const [reactGraph, setReactGraph] = useState([])

  componentDidMount() {
    let response = {}
    this.loadProject('IAA').then(
      (result) => {
        response = {
          error: null,
          isLoaded: true,
          project:result
        };


        const newState = {... this.state ,...response}
        this.setState(newState)

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
    const { error, isLoaded, project } = this.state;
    // console.log(this.state);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state)
      return (
        <div className='container-fluid'>
                      {this.state.project&&this.state.project.projectJson?(
                <FlowChart chartData={this.state.project.projectJson}/>
                ):(null)}

        </div>
      );
    }
  }
}

export default ProjectView
