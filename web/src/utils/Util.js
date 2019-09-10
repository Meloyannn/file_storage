class Util{

    static validateEmail(email){
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.length>0 ? re.test(email)? "" : "Email is not vald" : "Email can't be empty"
    }

    static validatePassword(password){
        return password.length>0 ? password.length>=6 ? "" : "Password length can't be less than 6" : "Password can't be empty"   
    }

    static validateConfPassword(password,confPassword){
        return confPassword.length>0 ? password===confPassword ? "" : "Enter the same password" : "Fill the confirm Password"
    }
}
export default Util