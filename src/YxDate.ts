import { YxDateCore } from "./YxDateCore";
import { Setting } from "./YxDateType";
/**
 * 雨轩日期选择器
 */
class YxDate extends YxDateCore {
   public constructor(option:Setting){
        super(option);
        this.bindTimeDomEvent();
   }
}