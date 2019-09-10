import React,{Component,Fragment} from "react"
import Http from '../../components/httpService'
import Auth from '../../components/authService'
import {Link} from "react-router-dom"
import FileUpload from '../../components/fileUpload'
import '../../css/home.css';
const filesListrs=require('../../files');

// const filesListrs=null;
// let sendData = {
//   token:Auth.getToken()
// }
// Http.post("/getitems", sendData)
// .then(function (res) {
//     filesListrs=res.data
// }).catch(function (err) {
//     console.log(err)
// })

const preload = {
		"data" : filesListrs
}
const Tbody = (props) => {
	return (
	  <Fragment>
		{props.items.data.map((item ,index)=> (
		  <Fragment key={item.id}>
			  <tr>
				  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.path}</td>
                  <td><Link to="#">View</Link><Link to="#">Download</Link><Link to="#">Remove</Link></td>
			  </tr>
			</Fragment>
        ))}
	  </Fragment>
	)
  }
class Home extends Component{

    constructor(props){
      super(props)
    }

    render(){
      if(Auth.getToken()){
        return (
            <div> 
                  <div className="logout">
                    <span> Username</span>
                    <Link to="#" title="Add new file" onClick="">+</Link>
                    <Link to="#" onClick={e => {
                          e.preventDefault()                           
                          Auth.remvoeToken()
                          let props = this.props
                          props.history.push("/login")
                          }}>Logout</Link>
                  </div>  
                  <table className="table"  cellSpacing="0" cellPadding="0" border="0">
                    <thead className="tbl-header">
                        <tr>
                            <th>#</th>
                            <th >Name</th>
                            <th>Type</th>
                            <th >Path</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tbl-content">
                        <Tbody  items={preload} />
                    </tbody>
                </table>
                  
                <FileUpload />
          </div>
            )}else {

              this.props.history.push("/login")
              return(null)
            }
    }
}
export default Home 