import React from 'react'
import styled from 'styled-components'
import { LinkDefault } from "@mrblenny/react-flow-chart";

const Label = styled.div`
  position: absolute;
`

const Button = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;
  height: 15px;
  width: 15px;
  transform: translate(50%, -50%);
  background: red;
  color: white;
  border-radius: 50%;
  transition: 0.3s ease all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
  }
`

const LabelContent = styled.div`
  padding: 5px 10px;
  background: cornflowerblue;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`

const defineLabelColor = (text) => {
  switch (text) {
    case 'yes' || 'ok' || true:
        return '#00ff00'
      break;
    case 'no' || 'cancel' || 'abbrechen' || false:
        return '#ff0000'
      break;
    default:
        return 'cornflowerblue'
  }
}

const CustomLink =  (props) => {
     const { startPos, endPos, onLinkClick, link } = props
     const centerX = startPos.x + (endPos.x - startPos.x) / 2
     const centerY = startPos.y + (endPos.y - startPos.y) / 2
     let thisLabelText = ''
     if (props.link.properties) {
       if (props.link.properties.label && props.link.properties.label!=undefined) {
       thisLabelText = props.link.properties.label
     }}
     else {
       thisLabelText = 'none'
     }

     let labelColor = defineLabelColor(thisLabelText)


     return (
       <>
         <LinkDefault {...props} />
         {thisLabelText!='none'?
         <Label style={{ left: centerX, top: centerY }}>
            { props.link.properties && props.link.properties.label && (
              <LabelContent style={{background: labelColor}}>{props.link.properties && props.link.properties.label}</LabelContent>
            )}
            {
           // <Button
           //   onClick={(e) => {
           //     onLinkClick({ linkId: link.id })
           //     // stateActions.onDeleteKey({})
           //     e.stopPropagation()
           //   }}
           // >
           //   x
           // </Button>
           }
         </Label>:null}
       </>
     )
   }

export default CustomLink
