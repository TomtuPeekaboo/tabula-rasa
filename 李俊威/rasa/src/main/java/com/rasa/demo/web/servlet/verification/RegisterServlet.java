package com.rasa.demo.web.servlet.verification;


import com.rasa.demo.common.enums.ApiInfo;
import com.rasa.demo.common.factory.ServiceProxyFactory;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.pojo.vo.ApiMsg;
import com.rasa.demo.service.UserService;
import com.rasa.demo.utils.MapUtil;
import com.rasa.demo.utils.ResponseUtil;
import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.Map;


/**
 * @author 86138
 * 注册功能服务器
 */
@WebServlet(name = "registerServlet", value = "/registerServlet")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //验证校验
        String check = request.getParameter("code");
        String username=request.getParameter("username");
        //从sesion中获取验证码
        HttpSession session = request.getSession();
        String checkcode_server = (String) session.getAttribute("CHECKCODE_SERVER");
        //为了保证验证码只能使用一次
        session.removeAttribute("CHECKCODE_SERVER");
        //比较

        //验证码错误
        if(checkcode_server == null || !checkcode_server.equalsIgnoreCase(check)){
            // 结果
            ApiMsg apiMsg=new ApiMsg(ApiInfo.CODE_ERROR);
            ResponseUtil.send(response,apiMsg);
            return;
        }

        //封装对象
        User user = MapUtil.getObject(request.getParameterMap(),User.class);
        System.out.println(user.toString());

        //3.调用service完成注册
        UserService service = ServiceProxyFactory.getUserService();

        ApiMsg apiMsg=null;
        if(service.register(user)){
            apiMsg=new ApiMsg(ApiInfo.USER_EXIST);
        }else{
            apiMsg=new ApiMsg(ApiInfo.OK,"注册成功！");

        }

        ResponseUtil.send(response,apiMsg);
    }
}
