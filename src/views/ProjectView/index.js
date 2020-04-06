import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import mermaid from 'mermaid'
import FlowChart from '../../components/FlowChart'
import Options from '../../components/ProjectOptions'

String.prototype.replaceAll = function(f,r){return this.split(f).join(r);}

const flowchartRef = React.createRef();
// export default const ProjectView = () => {
class ProjectView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: true,
        project: {}
      }
      this.flowchartRef = flowchartRef

      this.loadProject = loadProject.bind(this);
      this.loadFiles = loadFiles.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.saveProject = saveProject.bind(this);
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
        this.setState(response)
      })
  }

  handleClick(){ console.log("yes")}


  handleSave(e){
    let response = {}
    let  thatData = this.state.project
    thatData.projectJson = this.flowchartRef.current.state
    this.saveProject(this.state.project.name,thatData).then(
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
        this.setState(response)
      })
  }

  render() {
    const { error, isLoaded, project } = this.state;
    // console.log(this.state);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='container-fluid'>
              {this.state.project&&this.state.project.projectJson?(
                <>
                  <Options handleSave={this.handleSave}/>
                  <FlowChart id={'projectFlowGraph'} ref={flowchartRef} chartData={this.state.project.projectJson}/>
                </>
                ):(null)}


        </div>
      );
    }
  }
}

export default ProjectView
