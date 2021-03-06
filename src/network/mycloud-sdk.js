/**
 * Desc: NLECloud JS SDK 使用高风险，仅限实验用
 * Author: cs
 * Time: 2017-12-04 14:27
 * Version: 1.0.0
 * Copyright (c) 2016 新大陆物联网云平台
 */
import $ from 'jquery'
(function () {

    var API_HOST = "http://47.115.200.37:8008";
    var AccessToken = ''
    function jsonp(url, fn, token, data, type,contentType)
    {
        url += (url.indexOf('?') > 0 ? '&' : '?') + 't=' + (new Date()).getTime();
        if (token != null)
        {
            if (token === "")
            {
                console.log("请求" + url, { "Status": 1, "Msg": "AccessToken为空！" });
                return;
            }
            else
                url += "&accesstoken=" + token;
        }
        data = data || {};

        if (!type) type = "GET";
        $.ajax({
            url: url,
            type: type,
            method: type,
            data: data,
            contentType:contentType,
            success: function (result) {
                fn(result);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    //构造函数
    function NLECloudAPI() {}

    NLECloudAPI.prototype = {
        /*
        * 用户登录（同时返回AccessToken）
        * @param account 用户
        * @param password 密码
        * @param isRememberMe 记住密码
        */
        userLogin: function (account, password, isRememberMe) {
            var completedCallback;
            jsonp(
                API_HOST + '/Users/Login',
                function (res) {
                    if (res.Status === 0)
                        AccessToken = res.ResultObj.AccessToken;
                    completedCallback && completedCallback(res);
                }, null,
                JSON.stringify({
                    Account: account,
                    Password: password,
                    IsRememberMe: (isRememberMe ? true : false)
                }),"POST","application/json");
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        * 查询单个设备
        * @param deviceId 设备ID
        */
        getDeviceInfo: function (deviceId) {
            var completedCallback;
            if (!deviceId) throw "deviceId 不能为空";
            var url = API_HOST + "/Devices/" + deviceId;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
       * 查询书籍列表
       * @param
       */
        getBookList: function () {
            var completedCallback;
            var url = API_HOST + "/books";
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },
        /*
        * 模糊查询传感器
        * @param deviceId  设备id
        * @param apiTags  传感标识名，多个标识名之间用逗号分开（参数缺省时为查询所有）
        */
        getSensors: function (deviceId, apiTags) {
            var completedCallback;
            if (!deviceId) throw "deviceId 不能为空";
            var url = API_HOST + "/devices/" + deviceId + "/Sensors?apiTags=" + apiTags;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },


        /*
        * 查询传感数据
        * @param query 查询条件
        */
        getSensorData: function (query) {
            var completedCallback;
            if (!query) throw "query 不能为空";
            if (!query.DeviceId) throw "DeviceId 不能为空";
            var queryStr = "";
            queryStr += (query.DeviceId ? ("DeviceId=" + query.DeviceId + "&") : "");
            queryStr += (query.ApiTags ? ("ApiTags=" + query.ApiTags + "&") : "");
            queryStr += (query.Method ? ("Method=" + query.Method + "&") : "");
            queryStr += (query.TimeAgo ? ("TimeAgo=" + query.TimeAgo + "&") : "");
            queryStr += (query.Sort ? ("Sort=" + query.Sort + "&") : "");

            queryStr += (query.StartDate ? ("StartDate=" + encodeURIComponent(query.StartDate) + "&") : "");
            queryStr += (query.EndDate ? ("EndDate=" + encodeURIComponent(query.EndDate) + "&") : "");
            queryStr += (query.PageSize ? ("PageSize=" + query.PageSize + "&") : "PageSize=20&");
            queryStr += (query.PageIndex ? ("PageIndex=" + query.PageIndex + "&") : "PageIndex=1&");
            var url = API_HOST + "/devices/" + query.DeviceId + "/Datas?" + queryStr;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken);
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        },

        /*
        *发送命令/控制设备
        * @param deviceId 设备ID
        * @param apiTag 传感标识名（可选）
        * @param data 开关类：开=1，关=0，暂停=2
                      家居类：调光灯亮度=0~254，RGB灯色度=2~239，窗帘、卷闸门、幕布打开百分比=3%~100%，红外指令=1(on)2(off)
                      其它：integer/float/Json/String类型值
        */
        Cmds: function (deviceId, apiTag, data) {
            var completedCallback;
            var url = API_HOST + "/Cmds?deviceId=" + deviceId + "&apiTag=" + apiTag;
            jsonp(url, function (res) {
                completedCallback && completedCallback(res);
            }, AccessToken, data, "POST");
            return {
                completed: function (fn) {
                    completedCallback = fn;
                }
            }
        }

    };

    window.NLECloudAPI = NLECloudAPI;

})();


String.prototype.format = function (args) {
    var result = this;
    var reg;
    if (arguments.length > 0) {
        if (arguments.length === 1 && typeof (args) === "object") {
            for (const key in args) {
                if (Object.prototype.hasOwnProperty.call(args, 'key') && args[key] !== undefined) {
                    reg = new RegExp("({)" + key + "(})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};