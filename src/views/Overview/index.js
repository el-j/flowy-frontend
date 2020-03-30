import React from 'react';


/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import Projects from '../../dataMocks/projects.js'
import {getProjectsFromApi, createProject,uploadProjectData, removeProject} from '../../components/fetchApi'

import { NewProject, NewProjectDetails, YourProjects } from '../../components'

class Overview extends React.Component{
  state = {
      isLoaded: false,
      uploaded: false,
      projects: [],
      newProject: {
        sketchfile: '',
        mmdfile: '',
        xmlfile: '',
        name: ''
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
      this.setState(response)
    } ,(error) => {
            response = {
              isLoaded: true,
              projects: []
            }
            console.log('there is an error',error);
            // console.log(response)
            this.setState(response)
          })
  }

  handleChange = (e) => {
    console.log(e.target);
    const temp = this.state.newProject

    switch (e.target.id) {
      case 'newProjectName':
          temp.name = e.target.value
        break;
      case 'newMMD':
        temp.mmdfile = e.target.files

        break;
      case 'newSketch':
      temp.sketchfile = e.target.files

        break;
      case 'newXML':
      temp.xmlfile = e.target.files

        break;
      default:

    }
    this.setState({newProject: temp})

  }
  handleSubmit = (e) => {
    console.log(e);
       e.preventDefault()
       let response = {}
       var formData = new FormData();
       for (const key of Object.keys(this.state.newProject.sketchfile)) {
           formData.append('imgCollection', this.state.newProject.sketchfile[key])
       }
       uploadProjectData(`${this.state.newProject.name}`).then(result =>{
         console.log(result)
         response = {
           uploaded: true,
           createProgress:false
         }

         this.setState(response)
       } ,(error) => {
               response = {
                 uploaded: false,
                 createProgress:false
               }
               this.setState(response)
             })
   }

  handleCreateNewProject = (e) => {
    let response = {}
    const {name,xml,sketch,mmd} = this.state.newProject
    console.log("CREATE NEW PROJECT NOW >>>> NAME:",this.state.newProject.name);
    createProject(this.state.newProject.name).then(result =>{
      console.log("response result",result)
      response = {
        isLoaded: true,
        projects: result.projects,
        createProgress:true
      }

      this.setState(response)
    } ,(error) => {
            response = {
              isLoaded: true,
              projects: [],
              createProgress:false
            }
            console.log("we got error response",error);
            this.setState(response)
          })
  }

  handleRemove = (e) => {
    let response = {}
    const {name,xml,sketch,mmd} = this.state.newProject
    console.log("REMOVE NEW PROJECT NOW >>>> ",this.state.newProject.name);
    removeProject(this.state.newProject.name).then(result =>{
      console.log("response result",result)
      response = {
        isLoaded: true,
        createProgress:false
      }
      this.setState(response)
    } ,(error) => {
            response = {
              isLoaded: true,
              createProgress:false
            }
            console.log("we got error response",error);
            this.setState(response)
          })
  }

  render(){
    const { projects, newProject, createProgress } = this.state
    console.log(createProgress,this.state);
      return(
          <Container>
            <Row>
            {!createProgress?(
              <Col lg={12}>
                <NewProject
                  handleChange={this.handleChange}
                  value={newProject.name}
                  handleCreateNewProject={this.handleCreateNewProject}
                  />
              </Col>
            ):(
              <>
              <Col lg={12}>
                <NewProjectDetails
                  onSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  newProject={this.state.newProject}
                  handleRemove={this.handleRemove}
                  />

              </Col>

              </>
              )
            }
          </Row>
          <Row>
            <Col>

              <YourProjects projects={projects}/>
            </Col>
        </Row>
        </Container>
      )
    }
}
export default Overview
