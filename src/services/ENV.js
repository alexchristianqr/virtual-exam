export default {
    API: "http://service-api",
    fnError(e, subself = null, self = null) {
        switch (e.response.status) {
            case 412:// Exception Laravel
                console.error(e.response.data);
                break;
            case 422:// Exception Laravel
                subself.dataError = e.response.data;
                break;
            case 500:// Exception 500
                self.state.intent = setInterval(() => {
                    self.dispatch(subself.method, {self: subself});
                }, 60000);
                break;
            default:// Request Rules Validation Laravel 401,422
                console.error(e);
                break;
        }
    }
};