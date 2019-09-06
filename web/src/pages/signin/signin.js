import React, { Component } from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
import '../../css/style.css'
class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleInput = this.handleInput.bind(this)
    }
    handleInput(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            })
    }
    render() {
        return (
            <div className="login-page">
            <form autoComplete="off"  className="login-form">
                <span className="bgs">ACCOUNT LOGIN</span>
                <div>
                    <label className="sms">Username</label>
                    <input id="username" type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                </div>
                <div>
                    <label className="sms">Password</label>
                    <input id="password" type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                </div>
                <button type="submit" onClick={
                    e => {
                        e.preventDefault()
                        let data = this.state
                        Auth.remvoeToken()
                        Http.post("/signin", data)
                            .then(function (res) {
                                Auth.setToken(res.data.token);
                                this.props.history.push("/home")
                            }).catch(function (err) {
                                console.log(err)
                            })
                    }
                }>Sign In</button>
                <button type="button" onClick={ 
                            e=>{
                                let path="signUp"
                                this.props.history.push(path);
                            }
                }>Sign Up</button>
            </form>
            </div>
        )
    }
}
export default Signin