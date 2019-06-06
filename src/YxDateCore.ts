import { Calendar, Setting } from "./YxDateType";
import { YxDateConfig } from "./YxDateConfig";

/**
 * YxDate-Core 核心工具类
 */
export class YxDateCore extends YxDateConfig {

    protected constructor(option: Setting) {
        super(option);
        this.bindTimeDomEvent();
    }

    /**
     * 根据年月获取日历数组
     * @param year  年份
     * @param month  月份
     */
    protected getCalendar(year: number, month: number): Array<Calendar> {
        let result: Array<Calendar> = [];
        let date: Date = new Date(year, month - 1);
        let firstWeek: number = new Date(year, month - 1, 1).getDay();
        let start: number = 7 - (7 - firstWeek);
        date.setDate(date.getDate() - start);
        let num = 42;//每页共显示多少日期
        for (let i = 1; i <= num; i++) {
            let _date: number = date.getDate();
            let _month: number = date.getMonth() + 1;
            let obj: Calendar = {
                date: _date,
                month: _month,
                now: `${year}-${_month}-${_date}`,
            }
            obj.monthType = _month == month ? 0 : 1;
            result.push(obj);
            date.setDate(date.getDate() + 1);
        }
        return result;
    }
    /**
     * 给时间选择器的Dom绑定事件
     */
    protected bindTimeDomEvent() {
        const elem = this.elem;
        const event = this.event;
        var dateDom = document.querySelector(elem);
        if (!dateDom) {
            throw 'YxDate MainDom Is Not Found Setting.elem = ' + elem;
        }
        dateDom.addEventListener(event, () => {
            alert(1);
        });

    }
}