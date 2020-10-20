import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import SaveIcon from '@material-ui/icons/Save';

import { ReactComponent as AddNodeSvgIcon } from './AddNodeSvgIcon.svg'
import { ReactComponent as AddDecisionSvgIcon } from './AddDecisionSvgIcon.svg'
import { ReactComponent as AddPointSvgIcon } from './AddPointSvgIcon.svg'

const Outer = styled.div`
  top: 4rem;
  position: fixed;
  left: 0;
  z-index:900;
  width: 4rem;
`
const OuterBottom = styled.div`
  bottom: 0.25rem;
  position: fixed;
  right: 375px;
  z-index:900;
`

const useStyles = makeStyles((theme) => ({
  group:{
    margin: theme.spacing(1),

  },
  margin: {
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const LeftPanel = ({
createNewNode,
handleSave,
handlePrint
}) => {
   const classes = useStyles();

  return(<>
    <Outer>

      <ButtonGroup
       orientation="vertical"
       color="primary"
       aria-label="add to Project"
       variant="text"
       className={classes.group} 
     >
        <IconButton id="addNewNode" aria-label="add Node" className={classes.margin} size="small" onClick={(e)=>createNewNode(e)}>
            <SvgIcon component={AddNodeSvgIcon} fontSize="large" />
          </IconButton>
        <IconButton id="addNewDecisionNode" aria-label="add Decicsion" className={classes.margin} size="small" onClick={(e)=>createNewNode(e)}>
            <SvgIcon component={AddDecisionSvgIcon} fontSize="large" />
          </IconButton>
        <IconButton id="addNewPointNode" aria-label="add Point" className={classes.margin} size="small" onClick={(e)=>createNewNode(e)}>
            <SvgIcon component={AddPointSvgIcon} fontSize="large" />
        </IconButton>
    </ButtonGroup>

    </Outer>
    <OuterBottom>

    <Button
    variant="contained"
    color="primary"
    size="large"
    className={classes.button}
    startIcon={<SaveIcon />}
    onClick={(e)=>handleSave(e)}
  >
    Save
  </Button>

    </OuterBottom>
  { /*
    <Inner>
      <p>Print the current working State</p>
      <Button className={'btn-block'} onClick={handlePrint}>Print</Button>
   </Inner>
   */}

    </>)
}


export default LeftPanel
