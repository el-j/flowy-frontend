import React, {
  useState,
  useEffect
} from 'react'
import styled from 'styled-components'
import {
  IPortDefaultProps,
} from '@mrblenny/react-flow-chart'

const PortDefaultOuter = styled.div `
  width: 24px;
  height: 24px;
  background: cornflowerblue;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const standartPort = 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'
const errorPort = 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
const okPort = 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'
const standartPortColor = 'cornflowerblue'

const CustomPort = (props: IPortDefaultProps, isDefault) => {
  const [portProps, setPortProps] = useState(props.port.properties)
  const [portSvgPath, setPortSvgPath] = useState(standartPort)
  const [portColor, setPortColor] = useState(standartPortColor)
  useEffect(()=>{
    setPortProps(props.port.properties)
  },[props.port.properties])

  useEffect(() => {
    switch (portProps.value) {
      case 'yes':
      case true:
      case 'true':
        setPortSvgPath(okPort)
        setPortColor('#0f0')
        break;
      case 'no':
      case false:
      case 'false':
      case 'error':
        // console.log(portProps);
        setPortColor('#f00')
        setPortSvgPath(errorPort)
        break;
      default:
        setPortSvgPath(standartPort)
        setPortColor(standartPortColor)
    }
  }, [portProps])

  return ( <
    PortDefaultOuter style = {
      {
        backgroundColor: portColor
      }
    } >

    <
    svg style = {
      {
        width: '24px',
        height: '24px'
      }
    }
    viewBox = "0 0 24 24" >
    <
    path fill = "white"
    d = {
      portSvgPath
    }
    /> <
    /svg>

    <
    /PortDefaultOuter>
  )

}

export default CustomPort
