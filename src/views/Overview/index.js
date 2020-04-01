import React from 'react';
import { withRouter } from 'react-router-dom';

/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import Projects from '../../dataMocks/projects.js'
import {getProjectsFromApi, createProject,uploadProjectData, removeProject} from '../../components/fetchApi'

import { NewProject, NewProjectDetails, YourProjects } from '../../components'

class Overview extends React.Component{

  state = {
      isLoading: false,
      isLoaded: false,
      uploaded: false,
      projects: [],
      newProject: {
        name: '',
        files: ''
      },
      createProgress: false
  }

  componentDidMount = () => {
    let response = {}
    console.log("We get from Api now",this.state);
    getProjectsFromApi().then(result =>{
      console.log("myresult from api call",result)
      response = {
        isLoaded: true,
        projects: result,
      }
      console.log('the response', response);
      this.setState({...response})
    } ,(error) => {
            response = {
              isLoaded: true,
              projects: []
            }
            console.log('there is an error',error);
            // console.log(response)
            this.setState({...response})
          })
  }

  handleChange = (e) => {
    // console.log(e.target);
    const temp = this.state.newProject

    switch (e.target.id) {
      case 'newProjectName':
          temp.name = e.target.value
        break;
    }
    this.setState({newProject: temp})

  }
  handleSubmit = (event) => {
    console.log( 'from handle handleSubmit:',event,this.state)
    event.preventDefault()
       let response = {}
       var formData = new FormData();
       let files = this.state.newProject.files
       let name = this.state.newProject.name
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i],files[i].name)
       }
       let thatState = this.state
       formData.append('projectName',name)
       uploadProjectData(formData,name).then(result =>{
         console.log("resulte after upload ProjectData",result,this.state,thatState)
         response = {
           uploaded: true,
           createProgress:false,
           projects: result
         }
         console.log(this.state);
         this.setState({...response})
         console.log(this.state);
       } ,(error) => {
               response = {
                 uploaded: false,
                 createProgress:false
               }
               console.log(error,' oder was?');
               this.setState({...response})
             })
   }

  handleCreateNewProject = event => {
    event.persist()
    this.setState({isLoading:true})
    console.log(this.state);
    let response = {}
    const {name,xml,sketch,mmd, files} = this.state.newProject
    const mynewProject = this.state.newProject
    mynewProject.files = event.target.files

    console.log("CREATE NEW PROJECT NOW >>>> NAME:",this.state.newProject.name, event.target.files);
    createProject(this.state.newProject.name).then(result =>{
      console.log("response result",result,result.body)
      response = {
        isLoaded: true,
        projects: result.projects,
        createProgress:true,
        newProject: mynewProject
      }
        this.setState({...response}, this.handleSubmit(event))

    } ,(error) => {
            response = {
              isLoaded: true,
              projects: [],
              createProgress:false
            }
            console.log("we got error response",error);
            this.setState({...response})
          })

  }

  handleOpenProject = (projectName) => {
    let path = `/project/${projectName}`;

    console.log(path, this.props.history)
    this.props.history.push(path)
    }

  handleRemoveProject = (projectName) => {
    let response = {}
    console.log("REMOVE NEW PROJECT NOW >>>> ",projectName);
    removeProject(projectName).then(result =>{
      console.log("response result",result)
      response = {
        isLoaded: true,
        createProgress:false,
        projects: result
      }
      this.setState({...response})
    } ,(error) => {
            response = {
              isLoaded: true,
              createProgress:false
            }
            console.log("we got error response",error);
            this.setState({...response})
          })
  }

  render(){
    const { projects, newProject, createProgress } = this.state
      return(
          <Container>
            <Row>
              <Col lg={12}>
                <NewProject
                  handleChange={this.handleChange}
                  value={newProject.name}
                  handleCreateNewProject={this.handleCreateNewProject}
                  handleSubmit={this.handleSubmit}
                  />
              </Col>
          </Row>
          <Row>
            <Col>
              <YourProjects
                key='yourprojects'
                projects={projects}
                openProject={this.handleOpenProject}
                removeProject={this.handleRemoveProject}
                />
            </Col>
        </Row>
        </Container>
      )
    }
}
export default withRouter(Overview)
