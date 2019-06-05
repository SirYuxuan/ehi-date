class YxDate{
    constructor(option){
        this.settingConfig(option);
        this.initLaugLanguage(option.language);
        console.log('Init YxDate.');
        if(typeof option == 'undefined'){
            throw 'YxDate Setting Is Not Found';
        }
        if(typeof option != 'object'){
            throw 'YxDate Setting Is Not Object';
        }
        var elem = this.setting.elem;
        var dateDom = document.querySelector(elem);
        if(!dateDom){
            throw 'YxDate MainDom Is Not Found Setting.elem = ' + elem;
        }
        dateDom.addEventListener(this.setting.event,()=>{
            this.builder();
        });
        
    }
    /**
     * 处理配置项,给配置项处理默认值
     * @param {*} option 
     */
    settingConfig(option){
        this.setting = option;
        this.setting.event = option.event ? option.event : 'click';
    }
    initLaugLanguage(language){
        if(language != undefined){
            this.nowLanguage = this.language;
            return;
        }
        this.defalutLanguage = {
            'weeks':['日','一','二','三','四','五','六']
        }
        this.nowLanguage = this.defalutLanguage;
    }
    setLanguage(language){
       this.nowLanguage = language;
    }
    /**
     * 根据年月获取日历数组
     * @param {年份} year 
     * @param {月份} month 
     */
    getCalendar(year,month){
        let result = [];
        let date = new Date(year,month - 1);
        let firstWeek = new Date(year,month - 1,1).getDay();
        let start = 7 - (7 - firstWeek);
        date.setDate(date.getDate() - start);
        let num = 42;//每页共显示多少日期
        for(let i = 1; i <= num ; i++){
            let _date = date.getDate();
            let _month = date.getMonth() + 1;
            if(_month == month){
                result.push({date:_date,monthType:0,month:_month});
            }
            if(_month + 1 == month){
                result.push({date:_date,monthType:-1,month:_month});
            }
            if(_month - 1 == month){
                result.push({date:_date,monthType:1,month:_month});
            }
            date.setDate(date.getDate() + 1);
        }
        return result;
    }
    /**
     * 构建日期时间选择框
     */
    builder(d){
        //Head处理
        let thead = '<tr>';
        this.nowLanguage.weeks.forEach(element => {
            thead += `<th>${element}</th>`;
        });
        thead += '</tr>';
        //Body处理
        let body = '';
        let calendar = this.getCalendar(2019,d);
        let date = new Date();
        let nowDate = date.getDate();
        let nowMonth = date.getMonth();
        for(let i = 0; i < 6; i++){
            body += '<tr>';
            for(let j = 0; j < 7; j++){
                let start = j + (i)*7;
                if(calendar[start] == undefined){
                    console.log(start);
                    console.log(calendar);
                    return;
                }
                body += `<td class='${calendar[start].monthType == 0 ? "now" : "other" } ${(calendar[start].date == nowDate && calendar[start].monthType == 0 ) ? "nowDay" : ""}'>${calendar[start].date}</td>`;
            }
            body += '</tr>';
        }
       
        let div = `<div class='yxdate'>
        <div>头部</div>
        <div>
            <table>
                <thead>${thead}</thead>
                <tbody>${body}</tbody>
            </table>
        </div>
        <div>尾部</dvi>
        </div>`;
        document.querySelector('body').innerHTML+=div;
    }
    
}