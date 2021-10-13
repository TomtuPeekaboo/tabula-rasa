package com.rasa.demo.common.enums;

import jdk.nashorn.internal.objects.annotations.Getter;
import lombok.AllArgsConstructor;

/**
 * 网页与服务器交互的API响应信息
 * @author 86138
 */
@SuppressWarnings("AlibabaEnumConstantsMustHaveComment")

public enum ApiInfo {
    OK(200,"OK"),
    USER_EXIST(101,"用户已存在"),
    USER_MISS(102,"用户不存在"),
    PASSWORD_ERROR(103,"用户手机号码或密码不正确"),


    CODE_ERROR(104,"验证码错误"),
    Email_ERROR(105,"邮箱账号错误"),


    ;


    int code;
    String message;

    /**
     * 构造方法
     * @param code  状态码
     * @param message  状态信息
     */
    ApiInfo(int code, String message){
        this.code=code;
        this.message=message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
