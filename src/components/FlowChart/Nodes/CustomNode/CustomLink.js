import React, {
  useState,
  useEffect
} from 'react'
import styled from 'styled-components'
import {
  LinkDefault
} from "@mrblenny/react-flow-chart";

const Label = styled.div `
  position: absolute;
`

const Button = styled.div `
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

const LabelContent = styled.div `
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


const CustomLink = (props) => {
    const [linkProps, setLinkProps] = useState(props.link.properties)
    const [labelColor, setLabelColor] = useState('cornflowerblue')
    const [labelText, setLabelText] = useState('none')
    const {
      startPos,
      endPos,
      onLinkClick,
      link
    } = props
    const centerX = startPos.x + (endPos.x - startPos.x) / 2
    const centerY = startPos.y + (endPos.y - startPos.y) / 2
    let thisLabelText = ''

    useEffect(()=>{
      setLinkProps(props.link.properties)
    },[props.link.properties])

    useEffect(() => {
      if (linkProps) {
        if (linkProps.label && linkProps.label != undefined) {
          setLabelText(linkProps.label)
        }
      } else {
        setLabelText('none')
      }
    }, [linkProps])

    useEffect(() => {
      switch (labelText) {
        case 'yes':
        case 'ok':
        case true:
          setLabelColor('#00ff00')
          break;
        case 'no':
        case 'cancel':
        case 'abbrechen':
        case 'error':
        case false:
          setLabelColor('#ff0000')
          break;

        default:
          setLabelColor('#333')
      }
    }, [labelText]);

    return ( <
      >
      <
      LinkDefault {
        ...props
      }
      linkColorFrom={"#f0f"}
      linkColorTo={"#ff0"}
      /> {
        labelText != 'none' ?
          <
          Label style = {
            {
              left: centerX,
              top: centerY
            }
          } > {
            labelText && ( <
              LabelContent style = {
                {
                  background: labelColor
                }
              } > {
                labelText
              } < /LabelContent>
            )
          } {
            // <Button
            //   onClick={(e) => {
            //     onLinkClick({ linkId: link.id })
            //     // stateActions.onDeleteKey({})
            //     e.stopPropagation()
            //   }}
            // >
            //   x
            // </Button>
          } <
          /Label>:null} <
          />
      )
    }

    export default CustomLink
