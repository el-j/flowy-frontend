import React from "react";
import { getAllFiles, loadFiles, loadPngs } from '../../components/fetchApi'
import Table from  '../../components/Table'


class TextIdToScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      currlanguage: 'de_DE',
      languages: [],
      json: [],
      table: {
        header: ['Screename','TextId','Translation','Screenshot'],
        body: []
      },
      data:{}
    }
    this.getAllFiles = getAllFiles.bind(this);
    this.loadFiles = loadFiles.bind(this);
        this.loadPngs = loadPngs.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let response = {}
    this.getAllFiles(this.state).then(
      (result) => {
        response = {
          error: null,
          ...result
        };
        console.log(response,this.state);
        // let newState = {...this.state ,...response}
          this.setState(response)
          console.log(this.state);
      },
      (error) => {
        response = {
          isLoaded: true,
          error
        }
          let newState = {...this.state, ...response}
        console.log(newState)
        this.setState(newState)
      }
    )

  }

  handleClick = (type,filename) => {
    console.log(this.state);
      let thatstate = this.state
      let response = {}
      if (type === 'png') {

        loadPngs(type,filename).then(
          (result) => {
            response = {
              error: null,
              ...result
            };
            const newState = {...thatstate ,...response}
              this.setState(newState)
          },
          (error) => {
            response = {
              isLoaded: true,
              error
            }
          }
        )
      }
      else {


    loadFiles(type,filename).then(
      (result) => {
        response = {
          error: null,
          ...result
        };
        const newState = {...thatstate ,...response}
          this.setState(newState)
      },
      (error) => {
        response = {
          isLoaded: true,
          error
        }
      }
    )
}
  }

  tableHead = () => {
    return this.state.table.header.map((th,key) => {
      let width
      switch (th) {
        case 'Screename':
        width='10%'

          break;
        case 'TextId':
        width='10%'

          break;
        case 'Translation':
        width='20%'

          break;
        default:
        width='60%'
      }
      return(<th id={th} style={{minWidth:width,maxWidth:width,width:width}} key={key}>{th}</th>

    )})
  }

  tableRow = (language) => {
    if (!language) {
      language = this.state.currlanguage
    }
    let done = 0
    let data
    let screenname = []
    let text = []
    let row = []
    let readyrow = []
    if (this.state.json.length >= 1) {
      if (this.state.json[0].data.length >= 1) {
        data = JSON.parse(this.state.json[0].data)
        for (var variable in data.data) {
          if (data.data.hasOwnProperty(variable)) {

            let nextlevel = data.data[variable]
              for (var v2 in nextlevel) {
              if (screenname = variable) {
                screenname = variable
                // console.log("screenname is variable",screenname,row,v2,nextlevel,nextlevel[v2][language]);
                if (nextlevel.hasOwnProperty(v2)) {
                  // textId.push(v2)
                  text.push([v2,nextlevel[v2][language]])
                  // console.log(nextlevel[v2].en_GB,v2);
                }
              }else {
                text = []
              }
            }
            if (done === 0) {

              row.push(screenname)
              row.push(text)
              row.push('screenshot')
              text = []
              // console.log(done,row,text);
            }
            else if (done === data.data.length-1){
              // console.log('now we push the screenshot');
              row.push('screenshot')
              text = []
              done = 0
            }
            else {
              // console.log(text, "want to concat");
                      row.push(text)
                      // row.push('screenshot')
                      text = []
                      // console.log("the row:",row);
                      done++
            }
            // console.log(row,text);
            readyrow.push(row)
            row = []
          }

        }
        this.state.table.body = text
    let mydata = readyrow
    // console.log(readyrow);
    return (mydata.map((td,key) => {
      // console.log("see ",td);
      return(
        <tr key={td + key}>
        {td.map((d,k) => {
          // console.log(d,k);
          let otherpattern
          if (d === 'screenshot') {
              let pngs = this.state.png.filter(png => {
                let pattern = png.name
                otherpattern = td[0]
                if(pattern.includes(td[0])){
                    return pattern
                  }
              })
              if(pngs[0]){
                pngs.map(p => {
                  // console.log(p.name, td[0]);
                })
                  if (pngs[0].name) {
                    return <td key={d}><p>Image Name:<b>{pngs[0].name}</b></p><img src={`http://localhost:4000/images/dataplan/${pngs[0].name}`} /></td>
                  }
              }
              else {
                return <td>no image found for: {otherpattern}</td>
              }
          }

          else if (Array.isArray(d)) {
              if (this.state.table.header[k] === 'TextId' ) {
                  return <>
                  <td>{d.map((nested,k2) => {
                    return(Array.isArray(nested))?(nested.map((n,kk) => {
                      if (kk === 0) {
                        return (<p key={k2+kk}>{nested[0]}</p>)
                      }
                    })):undefined
                  })}
                  </td>
                  <td>{d.map((nested,k2) => {
                    return(Array.isArray(nested))?(nested.map((n,kk) => {
                    if (kk === 0) {
                      // console.log(n,kk);
                      return (<p key={k2+kk}>{nested[1]}</p>)
                    }
                  })):undefined
          })}
          </td></>
            }
            if (this.state.table.header[k+1] === 'Translation' ) {
              return <td style={{width:'20%'}}>{d.map((nested,k2) => {
              console.log("Translations:",nested[0],k2);
              return(Array.isArray(nested))?(nested.map((n,kk) => {
                      if (kk === 0) {
                        // console.log(n,kk);
                        return (<p>{nested[1]}</p>)
                      }
                      // console.log(n);
                    })):undefined


            })}
            </td>
          }
            }
          else {
            return <td key={d} >{d}</td>
          }
        }
      )}
      </tr>
    )
      }))
    }
  }
  else {
    return (<>loading</>)
  }
}
render(){


  return (
  <div className="container-fluid">
    <div className="row">
      <div className="col-6">
        <h2></h2>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
      <button onClick={() => this.handleClick('json')}>Get JSon</button>
      <label htmlFor="language">Change Language:</label>
      <select id="language">
      {(this.state.languages >=1)?(
        console.log(this.state.languaes),
        this.state.languaes.map((lang,key) => {
          console.log("we have this lang",lang);
        return <option key={key} value={lang}>{lang}</option>
      })):(<>{this.state.currlanguage}</>)}
      </select>
      </div>
      <div className="col-12">
      <table>
      <thead>
        <tr>
        {this.tableHead()}
        </tr>
        </thead>
        <tbody>
        {(this.state.json.length >= 1)?(this.tableRow()):(<></>)}
        </tbody>
      </table>
      </div>
    </div>
  </div>
);}

// <button onClick={() => this.handleClick('png')}>Get PNGs</button>



}

const RenderRow = (props) =>{
return props.keys.map((key, index)=>{
return <td key={props.data[key]}>{props.data[key]}</td>
})
}

export default TextIdToScreen
