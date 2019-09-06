import React,{Component,Fragment} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import '../../css/home.css';
const filesListrs=require('../../files');

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
    componentDidMount(){
        let token = localStorage.getItem("token")
        axios.get("/test",{headers:{
            token:token
        }}).then(function(res){
            console.log(res)
        }).catch(function(err){
            console.log(err)
        })
    }
    render(){
        return (
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
            )
    }
}
export default Home 