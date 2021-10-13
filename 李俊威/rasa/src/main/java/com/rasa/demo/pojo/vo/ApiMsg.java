package com.rasa.demo.pojo.vo;


import com.rasa.demo.common.enums.ApiInfo;
import java.io.Serializable;

/**
 * @author 86138
 */
public class ApiMsg <T> implements Serializable {
    /**响应状态码**/
    private int code;

    /**响应说明信息**/
    private String message;

    /**响应数据 可能为空**/
    private T data;

    public ApiMsg(T data){
        this.code=ApiInfo.OK.getCode();
        this.data=data;
    }

    public ApiMsg(ApiInfo apiInfo){
        this.code= apiInfo.getCode();
        this.message=apiInfo.getMessage();
    }

    public ApiMsg(ApiInfo apiInfo,String message){
        this.code= apiInfo.getCode();
        this.message=message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
