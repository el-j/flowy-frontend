import React from 'react';
import Grid from '@material-ui/core/Grid';

import CustomNode from './CustomNode'
import CustomInnerNode from './CustomNode/CustomInnerNode'
import CustomPort from './CustomNode/CustomPort'


const CustomNodePreview = React.forwardRef((props, ref) =>{
let thisnode = props.thisnode
return (<>
  <CustomNode node={{...thisnode}} ref={ref} style={{position:'relative'}}>
  <Grid container className="justify-content-center">
      {
      Object.keys(thisnode.ports).filter((port,key) => {
        if (thisnode.ports[port].type === 'input') {
          return (
            <Grid item lg="1" key={key} style={{transform:'translate(-25%,10px)'}}>
              <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
            </Grid>
            )}})
      }
  </Grid>
  <CustomInnerNode type='screen' node={{...thisnode}} />
  <Grid container className="justify-content-center">
    {
    Object.keys(thisnode.ports).filter((port,key) => {
      if (thisnode.ports[port].type === 'output') {
        return (
          <Grid item lg="1" key={key} style={{transform:'translate(-25%,-10px)'}}>
            <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
          </Grid>)
        }})
    }
  </Grid>
  </CustomNode>
  </>
)
})


export default CustomNodePreview
