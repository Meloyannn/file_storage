import React, { Component } from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
import '../../css/style.css'
import InputFields from '../../components/inputField'
class Signin extends Component {
    constructor(props) {
        super(props)
        this.state={
            email:"",
            password:"",
            confPassword:""
        }
    }

    handleInput(event) {
        this.setState(
            {[event.target.name]: event.target.value })}

    render() {
        return (
            <div className="signup-page">
                <form autoComplete="off" className="login-form">
                    <span className="bgs">account register</span>
                    <InputFields name='email' type='email' val='' value={this.state.email} onChange={this.handleInput}/>
                    <InputFields name='password' type='password' val='' value={this.state.password} onChange={this.handleInput}/>
                    <InputFields name='confPassword' type='password' val={this.state.password} value={this.state.confPassword} onChange={this.handleInput}/>
                    
                    <button type="submit" onClick={e => {
                        e.preventDefault()
                        //if(this.state.email!='' && this.state.password!='' && this.state.confPassword!='' && this.state.passErr===''  && this.state.emailErr==='' && this.state.confPassErr==='')
                        // {
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
                        // }
                    }}>Sign Up</button>
                </form>
            </div>
        )
    }
}
export default Signin