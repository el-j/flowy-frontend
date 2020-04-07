import React, {useState} from 'react';
import styled from 'styled-components'


const Root = styled.div`
  /* width: 100%; */
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Ul = styled.ul`
/* width: 100%; */
padding: 0px 0px 0px 24px  ;
`
const Li = styled.li`
/* width: 100%; */
`

const ListItemDecicion = (item) => (
  <Li key={item.name}>
  {console.log(item)}
  {item.type}:{item.name}
  </Li>
)

const ListItem = (item) => (
  <Li key={item.name}>
  {item.type}:{item.name}
  </Li>
)

const TreeView = ({items}) => {
  console.log(items)
    let decision = Object.keys(items).map((item,key) => {
    console.log(items[item].id,item,key,item.type)
    if (items[item].type === 'decision'){
      return (<ListItemDecicion type={items[item].type} name={items[item].name} />
      )
      }
    })

    let nodes = Object.keys(items).map((item,key) => {
      if (items[item].type !== 'decision'){
        return(
          <ListItem
           key={key}
           name={items[item].name}
           type={items[item].type}
           ports={items[item].ports}
           properties={ {
             custom: 'property',
           }}
         />)
        }
      })

  return(
    <Root>
      <Ul>
        <Li>
        <h6>Decisions</h6>
          <Ul>
          {decision}
          </Ul>
        </Li>
        <Li>
        <h6>Nodes</h6>
          <Ul>
          {nodes}
          </Ul>
        </Li>
      </Ul>
    </Root>

  )
}

export default TreeView
