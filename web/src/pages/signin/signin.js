import React,{Component} from "react"
import axios from 'axios'
class Signin extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:""
        }
        this.handleInput = this.handleInput.bind(this)
    }
    handleInput(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            })
    }
    render(){
        return (
            <form autoComplete="off">
                <div>
                    <input id="username" name="username" value={this.state.username} onChange={this.handleInput}/>
                    <label>Username</label>
                </div>
                <div>
                    <input id="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    <label>Password</label>
                </div>
                <button type="submit" onClick={
                    e=>{
                        e.preventDefault()
                        let data = this.state
                        axios.post("/signin",data)
                        .then(function(res){
                            localStorage.setItem("token",res.data.token)
                        }).catch(function(err){
                            console.log(err)
                        })
                    }
                }>Sign In</button>
            </form>
        )
    }
}
export default Signin