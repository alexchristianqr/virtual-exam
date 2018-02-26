/**
 * Created by aquispe on 24/02/2018.
 **/

const Util = {
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
};
export default Util;