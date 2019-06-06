class YxDate {
    bindTimeDomClick(elem){
        this.elem = elem;
        var dateDom = document.querySelector(elem);
        if (!dateDom) {
            throw 'YxDate MainDom Is Not Found Setting.elem = ' + elem;
        }
        dateDom.addEventListener(this.setting.event, () => {
            this.builder();
         });
    }
    constructor(option) {
        this.initLaugLanguage(option.language);
        this.settingConfig(option);
        console.log('Init YxDate.');
        if (typeof option == 'undefined') {
            throw 'YxDate Setting Is Not Found';
        }
        if (typeof option != 'object') {
            throw 'YxDate Setting Is Not Object';
        }
        //绑定时间选择器的点击事件
        this.bindTimeDomClick(this.setting.elem);

    }
    /**
     * 处理配置项,给配置项处理默认值
     * @param {*} option 
     */
    settingConfig(option) {
        this.setting = option;
        if(typeof this.setting.language == 'object'){
            this.nowLanguage = this.setting.language;
        }
        this.setting.event = option.event ? option.event : 'click';
    }
    initLaugLanguage(language) {
        if (language != undefined) {
            this.nowLanguage = this.language;
            return;
        }
        this.defalutLanguage = {
            'weeks': ['日', '一', '二', '三', '四', '五', '六']
        }
        this.nowLanguage = this.defalutLanguage;
    }
    setLanguage(language) {
        this.nowLanguage = language;
    }
    /**
     * 根据年月获取日历数组
     * @param {年份} year 
     * @param {月份} month 
     */
    getCalendar(year, month) {
        let result = [];
        let date = new Date(year, month - 1);
        let firstWeek = new Date(year, month - 1, 1).getDay();
        let start = 7 - (7 - firstWeek);
        date.setDate(date.getDate() - start);
        let num = 42;//每页共显示多少日期
        for (let i = 1; i <= num; i++) {
            let _date = date.getDate();
            let _month = date.getMonth() + 1;
            let obj = {
                date: _date,
                month: _month,
                now: `${year}-${_month}-${_date}`
            }
            obj.monthType = _month == month ? 0 : 1;
            result.push(obj);
            date.setDate(date.getDate() + 1);
        }
        return result;
    }
    /**
     * 创建日历主题html
     */
    createCalendarBody(year,month){
        let calendar = this.getCalendar(year, month);
        this._nowYear = year;
        this._nowMonth = month;
        let date = new Date();
        let nowDate = date.getDate();
        let body = '';
        for (let i = 0; i < 6; i++) {
            body += '<tr>';
            for (let j = 0; j < 7; j++) {
                let start = j + (i) * 7;
                body += `<td yx-time='${calendar[start].now}' class='yxdate-day ${calendar[start].monthType == 0 ? "now" : "other"} ${(calendar[start].date == nowDate && calendar[start].monthType == 0) ? "nowDay" : ""}'>${calendar[start].date}</td>`;
            }
            body += '</tr>';
        }
        return body;
    }
    /**
     * 销毁日历
     */
    destroyCalendar(){
      let timeDom =   document.querySelector('.yxdate');
      document.querySelector('body').removeChild(timeDom);
        //绑定时间选择器的点击事件
        //TODO 不是很明白为什么创建了日历就不能在点击了,So 销毁的时候在绑定一下事件
        this.bindTimeDomClick(this.setting.elem);
    }
    /**
     * 绑定每一天的点击事件
     */
    bindDayClick(){
        document.querySelectorAll('.yxdate-day').forEach(dom => {
            dom.addEventListener('click', () => {
                let time = dom.getAttribute('yx-time');
                let timeDom = document.querySelector(this.elem);
                this.destroyCalendar();
                if (typeof this.setting.dayChoose == 'function') {
                    let ret = this.setting.dayChoose(time);
                    if (ret != undefined) {
                        timeDom.value = ret;
                        return;
                    }
                }
                
                timeDom.value = time;
            });
        });

    }
    /**
     * 构建日期时间选择框
     */
    builder() {
        //Head处理
        let thead = '<tr>';
        this.nowLanguage.weeks.forEach(element => {
            thead += `<th>${element}</th>`;
        });
        thead += '</tr>';
        //Body处理
        let body = this.createCalendarBody(2019,6);
        let div = `<div class='yxdate'>
        <div class='header'>
            <i class='prevYear'><<</i>
            <i class='prevMonth'><</i>
            <div class='nowDateTime'>
                <span class='nowYear'></span>年&nbsp;
                <span class='nowMonth'></span>月
            </div>
            <i class='nextMonth'>></i>
            <i class='nextYear'>>></i>
        </div>
        <div class='content'>
            <table>
                <thead>${thead}</thead>
                <tbody>${body}</tbody>
            </table>
        </div>
        <div>尾部</dvi>
        </div>`;
        document.querySelector('body').innerHTML += div;
        //绑定下一月的点击事件
        document.querySelector('.nextMonth').addEventListener('click',()=>{
           this.updateCalendar(0,1);
        });
         //绑定上一月的点击事件
         document.querySelector('.prevMonth').addEventListener('click',()=>{
            this.updateCalendar(0,-1);
         });
          //绑定下一年的点击事件
        document.querySelector('.nextYear').addEventListener('click',()=>{
            this.updateCalendar(1,1);
         });
          //绑定上0一年的点击事件
        document.querySelector('.prevYear').addEventListener('click',()=>{
            this.updateCalendar(1,-1);
         });
        this.bindDayClick();
        document.querySelector('.yxdate').querySelector('.nowYear').innerHTML = this._nowYear;
        document.querySelector('.yxdate').querySelector('.nowMonth').innerHTML = this._nowMonth;
    }
    /**
     * 
     * @param {类型,0=月份,1=年份} type 
     * @param {时间} time 
     */
    updateCalendar(type,time){
        let year = this._nowYear;
        let month = this._nowMonth;
        if(type == 1){
            year += time;
        }
      
        if(type == 0){
            if(time >= 1){
                if(month + time > 12){
                    month = 1;
                    year ++;
                }else{
                    month += time;
                }
            }else{
                if(month + time < 0){
                    month = 11;
                    year --;
                }else{ 
                    month += time;
                }
            }
        }
        this._nowYear = year;
        this._nowMonth = month;
        console.log(year+"-" + month);
        document.querySelector('.yxdate').querySelector('.content').querySelector('tbody').innerHTML = this.createCalendarBody(year,month);
        this.bindDayClick();
        document.querySelector('.yxdate').querySelector('.nowYear').innerHTML = this._nowYear;
        document.querySelector('.yxdate').querySelector('.nowMonth').innerHTML = this._nowMonth;
    }

}