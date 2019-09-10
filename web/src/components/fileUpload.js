import React,{Component} from 'react'
class FileUpload extends Component{

    constructor(props){
        super(props)  
        this.state={
             file: null,
             name: "",
             path: "",
             tag: ""
        }
        this.handleInput = this.handleInput.bind(this)     
    }

    handleInput(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            })
        console.log(event.target.files[0])
    }

    render(){
        return(
            <div className="fileUpload">
                  <input type="file" name="file" onChange={this.handleInput}/>
            </div>
        )
    }
}
export default FileUpload