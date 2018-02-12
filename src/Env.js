import VueLocalStorage from "vue-local-storage";

export default {
    API: "http://api.survey",
    fnError(e,subself = null,self = null) {
        switch (e.response.status) {
            case 412:// Exception Laravel
                console.error(e.response.data);
                break;
            case 422:// Exception Laravel
                subself.dataError = e.response.data;
                break;
            case 500:// Exception 500
                self.state.intent = setInterval(()=>{
                    self.dispatch(subself.method,{self:subself});
                },60000);
                break;
            default:// Request Rules Validation Laravel 401,422
                console.error(e);
                break;
        }
    },
    doValidation(self) {
        if (self.params.email !== '' && self.params.password !== '') {
            if (self.params.email === "aquisper@sapia.com.pe" && self.params.password === "72482060" && VueLocalStorage.get("auth").authenticate === false) {
                VueLocalStorage.set("auth", {authenticate: true, id: 2});
                self.validate = null;
                this.doAuth(self);
            } else {
                VueLocalStorage.set("auth", {authenticate: false});
                self.validate = true;
                self.errors.login = "El campo email o contraseña no es correcto!";
                self.params.password = "";
                this.doAuth(self);
            }
        }
    },
    doAuth(self) {
        if (VueLocalStorage.get("auth").authenticate) {
            self.$router.replace('/project');
        } else {
            self.$router.replace('/login');
        }
    }
};