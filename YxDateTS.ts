class YxDate{
    //系统配置
    setting;
    constructor(option:object){
        this.settingConfig(option);
    }
     /**
     * 处理配置项,给配置项处理默认值
     * @param {*} option 
     */
    settingConfig(option):void{
        this.setting = option;
        this.setting.event = option.event ? option.event : 'click';
    }
    
}