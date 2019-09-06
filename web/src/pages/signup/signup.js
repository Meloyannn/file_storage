import React, { Component } from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
import '../../css/style.css'
class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            confPassword: ""
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
            <div className="signup-page">
                <form autoComplete="off" className="login-form">
                    <span className="bgs">account register</span>
                    <div>
                        <label className="sms">Username</label>
                        <input autoComplete="off" id="username" type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                    </div>
                    <div>
                        <label className="sms">Password</label>
                        <input autoComplete="off" id="password" type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                    </div>
                    <div>
                        <label className="sms">Confirm Password</label>
                        <input autoComplete="off" id="confPassword" type="password" name="confPassword" value={this.state.confPassword} onChange={this.handleInput} />
                    </div>
                    <button type="submit" onClick={e => {
                        e.preventDefault()
                        let sendData = {
                            email:this.state.email,
                            password:this.state.password
                        }
                        Auth.remvoeToken()
                        let props = this.props
                        Http.post("/signup", sendData)
                            .then(function (res) {
                                Auth.setToken(res.data.token);
                                props.history.push("/")
                            }).catch(function (err) {
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