export default({
    API:"http://api.survey",
    fnError(e){
        switch (e.response.status) {
            case 412:// Exception Laravel
                console.error(e.response.data);
                break;
            default:// Request Laravel 401,422
                console.error(e.response.data);
                break;
        }
    }
})