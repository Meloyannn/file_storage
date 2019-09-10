import React, { Component } from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
import InputFields from '../../components/inputField'
import '../../css/style.css'
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            confPassword: "",
            errorMsg: ""
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
                <form autoComplete="off" className="login-form" onChange={this.handleInput}>
                      <span className="bgs">account register</span>
                      <InputFields name='email' type='email' passVal=''  />
                      <InputFields name='password' type='password' passVal={this.state.confPassword}  />
                      <InputFields name='confPassword' type='password' passVal={this.state.password}  />
                      {this.state.errorMsg.length>0 ? <span className='invalid-feedback'>{this.state.errorMsg}</span> : ""}
           
                      <button type="submit" onClick={e => {
                        e.preventDefault()
                        if(this.state.email!='' && this.state.password!='' && this.state.confPassword!='')
                        {
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
                        } else {
                            this.setState({
                                errorMsg: "Please fill the all fields"
                          })
                        }
                    }
                    }>Sign Up</button>

                </form>
            </div>
        )
    }
}
export default Signup