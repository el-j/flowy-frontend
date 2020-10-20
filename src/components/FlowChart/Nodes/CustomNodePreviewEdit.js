import React from 'react';
import Grid from '@material-ui/core/Grid';

import CustomNode from './CustomNode'
import CustomInnerNodeEdit from './CustomNode/CustomInnerNodeEdit'
import CustomPort from './CustomNode/CustomPort'


const Placeholder = () => (<Grid item lg="1" key={'nokey'} style={{transform:'translate(-25%,10px)'}}>
    <div style={{width:'1px',height:'24px'}}></div>
    </Grid>)

const CustomNodePreviewEdit = React.forwardRef((props, ref) =>{
let thisnode = props.thisnode
// console.log(thisnode)
return (<>
  <CustomNode node={{...thisnode}} ref={ref} style={{position:'relative'}}>
  <Grid container className="justify-content-center">
      {
      Object.keys(thisnode.ports).length > 0 ? (
        Object.keys(thisnode.ports).map((port,key) => {
          if (thisnode.ports[port].type === 'input') {
            return (
              <Grid item lg="1" key={key} style={{transform:'translate(-25%,10px)'}}>
                <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
              </Grid>
              )}
              // else if (thisnode.ports[port].type !== 'input'){
              // return <Placeholder />
              // }
            })
        ):(null)
      }
  </Grid>
  <Grid container className="justify-content-center">
  <CustomInnerNodeEdit type='screen' node={{...thisnode}} handleChange={props.handleChange} />
  </Grid>
  <Grid container className="justify-content-center">
    {
    Object.keys(thisnode.ports).length > 0 ? (
      Object.keys(thisnode.ports).map((port,key) => {
        if (thisnode.ports[port].type === 'output') {
          return (
            <Grid item lg="1" key={key} style={{transform:'translate(-25%,-10px)'}}>
              <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
            </Grid>)
          }
          // else {
          //   return <Placeholder />
          // }
        })
      ):(null)
    }
  </Grid>
  </CustomNode>
  </>
)
})


export default CustomNodePreviewEdit
