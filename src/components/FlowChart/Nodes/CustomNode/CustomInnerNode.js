import React, { useRef }  from "react";
import { INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import { projectDir, serverUrl, serverPort } from '../../../../tools/fetchApi'
import Typography from '@material-ui/core/Typography';

const Outer = styled.div`
   background-color:#fff;
  max-width: 500px;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
`

const PointWrapper = styled.div`
  background: #fff;
  border: 4px solid #dadada;
  width: 200px;
  height: 200px;
  border-radius: 100%;
`

const PointInner = styled.div`
  transform: translate(5px,40px);
  text-align: center;
  width:180px;
  height: 140px;

`
const DecisionWrapper = styled.div`
  transform: rotate(45deg);
  background: #dadada;
  width: 200px;
  height: 200px;
`

const DecisionInner = styled.div`
  transform: translate(20px,40px) rotate(-45deg);
  text-align: center;
  width:180px;
  height: 140px;

`

const CustomInnerNode = ({ node, config, handleImageHeight }: INodeInnerDefaultProps) => {

  let ref = useRef(`${node.id}_picId`)

  let thisProjectDir = projectDir
  let thisPicUrl = `${thisProjectDir}/${node.path}`
  if (node.path === "/no_image.png") {
    thisProjectDir = `${serverUrl}:${serverPort}`
    thisPicUrl = `${thisProjectDir}${node.path}`
  }
  return node.displayType==='decision'?(<DecisionWrapper>
            <DecisionInner>
            <Typography variante={'h5'}>{node.name}</Typography>
            <Typography variant={'p'}>{node.text}</Typography>
            <Typography variant={'p'} className="figure-caption text-center" style={{padding: '4px',
            margin: 0,
            transform: 'translate(20px,10px )',
            position: 'absolute',
            zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></Typography>
            </DecisionInner>
          </DecisionWrapper>):(node.displayType === 'point')?(<PointWrapper>
            <PointInner>
            <Typography variante={'h5'}>{node.name}</Typography>
            <Typography variant={'p'}>{node.text}</Typography>
            <Typography variant={'p'} className="figure-caption text-center" style={{padding: '4px',
            margin: 0,
            transform: 'translate(40px,10px )',
            position: 'absolute',
            zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></Typography>
            </PointInner>
          </PointWrapper>):(<Outer id={node.id} >
        <div style={{display:'block', width: '100%'}}>
          <img
            alt={node.name}
            id={`${node.id}_picId`}
            onLoad={config.handleImageHeight}
            src={`${thisPicUrl}`}
            style={{width:'inherit', height: 'inherit'}}
            ref={ref}
            />
        </div>
        <Inner>
        <Typography variante={'h5'}>{node.name}</Typography>
        <Typography variant={'p'}>{node.text}</Typography>

        </Inner>
        <Typography variant={'p'} className="figure-caption" style={{padding: '4px',
        margin: 0,
        transform: 'translateY(10px)',
        position: 'absolute',
        zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></Typography>
      </Outer>)
  }

export default CustomInnerNode
