import React from "react";

export default class Table extends React.Component {
 constructor(props){
 super(props);
 this.getHeader = this.getHeader.bind(this);
 this.getRowsData = this.getRowsData.bind(this);
 this.getKeys = this.getKeys.bind(this);
 }

 getKeys = function(){
   // console.log(JSON.parse(this.props.data.data));
   let temp = JSON.parse(this.props.data.data)
   // console.log(Object.keys(temp.data));
  return Object.keys(temp.data);
  }

 getHeader = function(){
  var keys = this.getKeys();
  return keys.map((key, index)=>{
  return <th key={key}>{key.toUpperCase()}</th>
  })
  }

  getRowsData = function(){
   var items = JSON.parse(this.props.data.data)
   items = Object.entries(items.data)
   // console.log(items);
   var keys = this.getKeys();
   return items.map((row, index)=>{
   return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
   })
   }

 render() {
 return (
 <div>
 {// console.log(this.props)}
 <table>
 <thead>
 <tr>{this.getHeader()}</tr>
 </thead>
 <tbody>
 {this.getRowsData()}
 </tbody>
 </table>
 </div>

 );
 }
}

const RenderRow = (props) =>{
 return props.keys.map((key, index)=>{
 return <td key={props.data[key]}>{props.data[key]}</td>
 })
}
