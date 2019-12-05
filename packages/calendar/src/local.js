class MyDate{
  constructor(date){
    this.today = new Date(date)
    this.dateDesc = [
      '初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
      '十一','十二','十三','十四','十五','十六','十七','十八','十九','廿十',
      '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'
    ]
  }

  InitArray () {
    let ret = null
    ret.length = arguments.length
    for (let i = 0; i < ret.length; i++) ret[i + 1] = arguments[i]
    return ret
  }

  InitFestive () {
    let ret = ''
    let calendar = this.today
    let month = calendar.getMonth() + 1
    let date = calendar.getDate()
    if ((month === 1) && (date === 1)) ret = '元旦'
    if ((month === 3) && (date === 12)) ret = '植树节'
    if ((month === 4) && (date === 5)) ret = '清明节'
    if ((month === 5) && (date === 1)) ret = '国际劳动节'
    if ((month === 5) && (date === 4)) ret = '青年节'
    if ((month === 6) && (date === 1)) ret = '国际儿童节'
    if ((month === 8) && (date === 1)) ret = '建军节'
    if ((month === 8) && (date === 16)) ret = '七夕情人节'
    if ((month === 10) && (date === 1)) ret = '国庆节/国际音乐节/国际老人节'
    if ((month === 12) && (date === 24)) ret = '平安夜'
    if ((month === 12) && (date === 25)) ret = '圣诞节'
    return ret
  }

  getNormalDateString () {
    let ret = ''
    let _d = this.InitArray('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
    ret = (this.today.getFullYear() + '年' + 
          (this.today.getMonth() + 1) + '月' + 
          this.today.getDate() + '日 ' + 
          _d[this.today.getDay() + 1] + ' ')
    return ret
  }  

  getLocalDate () {
    let _Q = 0
    let _R = 0
    let _YY = this.today.getFullYear()
    let _MM = this.today.getMonth() + 1
    let _DD = this.today.getDate()
    _Q = Math.floor((_YY - 1977) / 4)
    _R = (_YY - 1977) % 4
    const _T = (new Date(_YY + '/' + _MM + '/' + _DD + ' ' + '12:00:00').getTime()) - new Date(_YY.toString()).getTime()
    let _N = Math.ceil(_T / 86400000) + 1
    let _n = (14 * _Q + 10.6 * (_R + 1) + _N) % 29.5
    if (_n < 0.5) {
      return this.dateDesc[28]
    }
    if (_n < 1) {
      return this.dateDesc[29]
    }
    return this.dateDesc[Math.floor(_n) - 1]
  }
}

export default MyDate