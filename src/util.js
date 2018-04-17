export default {
  toHHMMSS (sec) {
    let sec_num = parseInt(sec, 10), // don't forget the second param
      hh = Math.floor(sec_num / 3600),
      mm = Math.floor((sec_num - (hh * 3600)) / 60),
      ss = sec_num - (hh * 3600) - (mm * 60)
    if (hh < 10) hh = '0' + hh
    if (mm < 10) mm = '0' + mm
    if (ss < 10) ss = '0' + ss
    return hh + ':' + mm + ':' + ss
  },
  fnError (e, subself = null, self = null) {
    switch (e.response.status) {
      case 412:// Exception Laravel
        console.error(e)
        break
      case 422:// Exception Laravel
        subself.dataError = e.response.data
        break
      default:// code 500
        self.state.intent = setInterval(() => {
          self.dispatch(subself.method, {self: subself})
        }, 120000)
        break
    }
  },
  setCookie (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/'
  },
  getCookie (cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return JSON.parse(c.substring(name.length, c.length))
      }
    }
    return ''
  },
  removeCookie(name,path) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path='+path;
  },
  returnLetter (key, toUpper = false) {
    let letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    if (toUpper) {
      return (letter[key]).toString().toUpperCase()
    } else {
      return (letter[key]).toString().toLocaleLowerCase()
    }
  },
  getImgUrl(name_file) {
    return require('@/assets/img/' + name_file);
  },
}