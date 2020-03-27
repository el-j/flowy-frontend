import React from 'react';




const NewProject = () => {

  return (
    <>
      <div className="row">
        <div className="col">
          <h2>New Project</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <label>
 Name:
 <input type="text" name="name" />
</label>
<input type="submit" value="Submit" />  
        </div>
      </div>
    </>)
}



class Overview extends React.Component{
  state = {
      projects: []
    }

  render(){
      return(
          <div className="container">
            <div className="row">
              <div className="col-6">
                <NewProject />
              </div>
          </div>
        </div>
      )
    }
}
export default Overview
