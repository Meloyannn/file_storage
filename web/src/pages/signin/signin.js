import React, { Component } from "react"
import Http from '../../components/httpService'
import Auth from "../../components/authService"
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
            <form autoComplete="off">
                <div>
                    <input id="username" type="email" name="email" value={this.state.email} onChange={this.handleInput} />
                    <label>Username</label>
                </div>
                <div>
                    <input id="password" type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                    <label>Password</label>
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
            </form>
        )
    }
}
export default Signin