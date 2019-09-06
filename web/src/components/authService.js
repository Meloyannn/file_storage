class Auth {
    static setToken(token){
        if(!token) throw "Token undefined"
        localStorage.setItem("Token",token)
    }
    static remvoeToken(){
        localStorage.removeItem("Token")
    }
}
export default Auth