import axios from "axios"
class HttpService {
    static get(url){
        let token = localStorage.getItem("token") || undefined
        let header = {
            token:token
        }
        return axios.get(url,{headers:header})
    }
    static post(url,sendData){
        let header = {
            token:token
        }
        return axios.post(url,sendData,{headers:header})
    }
}
module.exports = HttpService