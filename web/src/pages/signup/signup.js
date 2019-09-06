import React,{Component} from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
import '../../css/style.css'
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
            <div className="signup-page">
                <form autoComplete="off" className="login-form">
                    <span className="bgs">account register</span>
                    <div>
                        <label className="sms">Username</label>
                        <input id="username" name="username" value={this.state.username} onChange={this.handleInput}/>
                    </div>
                    <div>
                        <label className="sms">Password</label>
                        <input id="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    </div>
                    <div>
                        <label className="sms">Confirm Password</label>
                        <input id="cnfpassword" name="cnfPassword" value={this.state.cnfPassword} onChange={this.handleInput}/>
                    </div>
                    <button type="submit" onClick={
                        e=>{
                            e.preventDefault()
                            let data = this.state
                            Auth.remvoeToken()
                            Http.post("/signup",data)
                            .then(function(res){
                                Auth.setToken(res.data.token);
                                this.props.history.push("/home")
                            }).catch(function(err){
                                console.log(err)
                            })
                        }
                    }>Sign Up</button>
                     
                </form>
            </div>
        )
    }
}
export default Signin