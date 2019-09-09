class Auth {
    static setToken(token){
        if(!token) throw new Error("Token undefined")
        localStorage.setItem("Token",token)
    }

    static getToken(){
        localStorage.getItem("token")
    }

    static remvoeToken(){
        localStorage.removeItem("Token")
    }
}
export default Auth