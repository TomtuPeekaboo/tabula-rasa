package com.rasa.demo.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rasa.demo.pojo.vo.ApiMsg;


import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author 86138
 * 响应工具类  将响应的信息转化为json对象
 */
public class ResponseUtil {

    public static <T> void  send(HttpServletResponse response, ApiMsg<T> msg) throws IOException {
        ObjectMapper mapper=new ObjectMapper();
        String json= mapper.writeValueAsString(msg);
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }
}
