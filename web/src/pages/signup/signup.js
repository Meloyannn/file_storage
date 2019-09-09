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
            confPassword: "",
            emailErr: "",
            passErr: "",
            confPassErr: ""
        }
        this.handleInput = this.handleInput.bind(this)
    }
    handleInput(event) {
        const { name, value } = event.target;
        this.setState(
            {[event.target.name]: event.target.value },
            ()=>{
                console.log(name)
                switch(name) {
                    case 'email':
                        return this.validateEmail();
                    case 'password':
                        return this.validatePassword();
                    case 'confPassword':
                        return this.validateConfPassword();
                    default:
                        return '';
                }
            }
            )
    }

    validateEmail=()=>{
        const{email}=this.state
        this.setState({
            emailErr:email.length>0?"":"Email can't be empty"
        })
    }

    validatePassword=()=>{
        const{password}=this.state
        this.setState({
            passErr:password.length>0?"":"Password can't be empty"
        })
    }

    validateConfPassword=()=>{
        const{password,confPassword}=this.state
        this.setState({
            confPassErr:confPassword.length>0?password==confPassword?"":"Enter the same password":"Fill the confirm Password"
        })
    }

    render() {
        return (
            <div className="signup-page">
                <form autoComplete="off" className="login-form">
                    <span className="bgs">account register</span>
                    <div>
                        <label className="sms">Email</label>
                        <input autoComplete="off" id="username" type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                        <span className='invalid-feedback'>{this.state.emailErr}</span>
                    </div>
                    <div>
                        <label className="sms">Password</label>
                        <input autoComplete="off" id="password" type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                        <span className='invalid-feedback'>{this.state.passErr}</span></div>
                    <div>
                        <label className="sms">Confirm Password</label>
                        <input autoComplete="off" id="confPassword" type="password" name="confPassword" value={this.state.confPassword} onChange={this.handleInput} />
                        <span className='invalid-feedback'>{this.state.confPassErr}</span> </div>
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