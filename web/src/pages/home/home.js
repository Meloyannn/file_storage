import React,{Component} from "react"
import axios from "axios"
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
        return (<div>Home</div>)
    }
}
export default Home 