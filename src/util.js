export default {
    toHHMMSS(sec) {
        let sec_num = parseInt(sec, 10), // don't forget the second param
            hh = Math.floor(sec_num / 3600),
            mm = Math.floor((sec_num - (hh * 3600)) / 60),
            ss = sec_num - (hh * 3600) - (mm * 60);
        if (hh < 10) hh = "0" + hh;
        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;
        return hh + ':' + mm + ':' + ss;
    },
    fnError(e, subself = null, self = null) {
        switch (e.response.status) {
            case 412:// Exception Laravel
                console.error(e);
                break;
            case 422:// Exception Laravel
                subself.dataError = e.response.data;
                break;
            default:// code 500
                self.state.intent = setInterval(() => {
                    self.dispatch(subself.method, {self: subself});
                }, 120000);
                break;
        }
    },
}