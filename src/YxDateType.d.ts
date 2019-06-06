/**
 * 日历类型
 */
export interface Calendar {
    /**
     * 当前日
     */
    date: Number;
    /**
     * 当前月
     */
    month: Number;
    /**
     * 当前具体时间
     */
    now: string;
    /**
     * 元列
     */
    [x: string]: any;
}
/**
 * 配置类型
 */
export interface Setting {
    /**
     * 元列
     */
    [x: string]: any;
}