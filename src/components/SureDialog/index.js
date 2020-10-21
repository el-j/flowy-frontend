import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SureDialog = ({showAlert,setShowAlert,handleOk,topic}) => (
<Dialog
   open={showAlert}
   onClose={()=>setShowAlert(false)}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
 >
   <DialogTitle id="alert-dialog-title">Delete Project: <b>{`${topic}`}</b>?</DialogTitle>
   <DialogContent>
     <DialogContentText id="alert-dialog-description">
       Are you sure you want to delete the Project:<br/> <b>{topic}</b> <br/>
       completely? This step cannot be undone!
     </DialogContentText>
   </DialogContent>
   <DialogActions>
     <Button onClick={()=>setShowAlert(false)} color="primary">
       Cancel
     </Button>
     <Button onClick={()=>handleOk(topic)} color="primary" autoFocus>
       Ok
     </Button>
   </DialogActions>
 </Dialog>)

 export default SureDialog
