import { YxDateCore } from "./YxDateCore";
/**
 * 雨轩日期选择器
 */
class YxDate extends YxDateCore {
    constructor(option) {
        super(option);
        this.bindTimeDomEvent();
    }
}
