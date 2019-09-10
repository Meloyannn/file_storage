import React,{Component} from 'react'
import Util from '../utils/Util'
class InputField extends Component{
 
 name=""
 pasVal=""

    constructor(props){
       super(props)  
       this.name=this.props.name
       this.state={
            inputName:"",
            errorMessage:""
       }
       this.handleInput = this.handleInput.bind(this)     
    }


    handleInput(event) {
        this.pasVal=this.props.passVal
        this.setState(
            {inputName: event.target.value }
            )
    }

    validateField=()=>{
        const{inputName}=this.state
        const erMessage=""
        switch(this.name) {
                    case 'email':
                          this.setState({
                                errorMessage: Util.validateEmail(inputName)
                          })  
                          break;
                    case 'password':
                          this.setState({
                                errorMessage: Util.validatePassword(inputName)
                          })
                          break;
                    case 'confPassword':
                          this.setState({
                                errorMessage: Util.validateConfPassword(this.pasVal,inputName)
                          })
                          break;
        }
    }

    render(){
        return(
            <div>
               <label className="sms">{this.props.name=="confPassword"?'confirm password':this.props.name}</label>
               <input autoComplete="off" id={this.props.name} type={this.props.type} name={this.props.name} value={this.state.inputName} onChange={this.handleInput} onBlur={this.validateField} />
               {this.state.errorMessage.length>0 ? <span className='invalid-feedback'>{this.state.errorMessage}</span> : ""}
            </div>
        )
    }
}
export default InputField