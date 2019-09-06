import React,{Component,Fragment} from "react"
import {Link} from "react-router-dom"
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