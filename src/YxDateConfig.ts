import { Setting } from "./YxDateType";
/**
 * 处理读取配置项
 */
export class YxDateConfig {
    /**
     * 系统配置项
     */
    private setting: Setting;
    /**
     * 系统当前使用的语言包
     */
    private nowLanguage: Setting;
    /**
     * 系统默认的语言包
     */
    private defalutLanguage: Setting;
    /**
     * 初始化系统所有配置
     * @param option 配置项
     */
    protected constructor(option: Setting) {
        if (typeof option == 'undefined') {
            throw 'YxDate Setting Is Not Found';
        }
        this.settingConfig(option);
    }
    /**
     * 处理配置项,给配置项处理默认值
     * @param option 配置项
     */
    private settingConfig(option: Setting): void {
        this.setting = option;
        if (typeof this.setting.language == 'object') {
            this.nowLanguage = this.setting.language;
        } else {
            this.initLanguage(option.language);
        }
        //触发事件
        this.setting.event = option.event ? option.event : 'click';
        //时间选择器所在的input dom
        this.setting.elem = option.elem ? option.elem : '';
    }
    /**
     * 初始化系统语言配置
     * @param language 语言包
     */
    private initLanguage(language: Setting): void {
        if (language != undefined) {
            this.nowLanguage = language;
            return;
        }
        this.defalutLanguage = {
            'weeks': ['日', '一', '二', '三', '四', '五', '六']
        }
        this.nowLanguage = this.defalutLanguage;
    }


    //Getter 方法获取系统配置
   /**
    * 获取时间选择器所在的dom
    */
    protected get elem(): any {
        return this.setting.elem;
    }
    /**
     * 获取出发时间选择器的事件
     */
    protected get event(): string {
        return this.setting.event;
    }
    //对外提供的方法
    /**
     * 设置系统语言包
     * @param language 语言包
     */
    public setLanguage(language: Setting): void {
        this.nowLanguage = language;
    }
}