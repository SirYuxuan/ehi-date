var YxDate = /** @class */ (function () {
    function YxDate(option) {
        this.settingConfig(option);
    }
    /**
    * 处理配置项,给配置项处理默认值
    * @param {*} option
    */
    YxDate.prototype.settingConfig = function (option) {
        this.setting = option;
        this.setting.event = option.event ? option.event : 'click';
    };
    return YxDate;
}());
