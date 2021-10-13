package com.rasa.demo.web.servlet.verification;

import com.rasa.demo.common.enums.ApiInfo;
import com.rasa.demo.common.factory.ServiceProxyFactory;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.pojo.vo.ApiMsg;
import com.rasa.demo.service.UserService;
import com.rasa.demo.utils.MapUtil;
import com.rasa.demo.utils.ResponseUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "loginServlet", value = "/loginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user =  MapUtil.getObject(request.getParameterMap(), User.class);
        UserService userService= ServiceProxyFactory.getUserService();
        //从数据库中返回过来的完整对象
        User realUser=userService.getUser(user);
        System.out.println("user="+user.toString());
        System.out.println("realUser="+realUser.toString());
        String remember=request.getParameter("remember");
        //返回对象
        ApiMsg apiMsg=null;
        if(realUser==null){
            apiMsg =new ApiMsg(ApiInfo.USER_MISS);
        }else{
            if(user.getPhone().equals(realUser.getPhone())&&user.getPassword().equals(realUser.getPassword())){
                apiMsg=new ApiMsg(ApiInfo.OK,"登录成功！");
                request.getSession().setAttribute("userid",realUser.getId());
                if("true".equals(remember)){
                    //持久化登录
                    Cookie cookies_username = new Cookie("rasa_username", realUser.getUsername());
                    Cookie cookies_password = new Cookie("rasa_password", realUser.getPassword());
                    //设置持久化时间
                    cookies_username.setMaxAge(60*60*24*7);
                    cookies_password.setMaxAge(60*60*24*7);
                    //设置cookie携带路径
                    cookies_password.setPath("/");
                    cookies_password.setPath("/");
                    //发送cookie到浏览器,也就是 回写cookie
                    response.addCookie(cookies_username);
                    response.addCookie(cookies_password);
                }

            }else{
                apiMsg=new ApiMsg(ApiInfo.PASSWORD_ERROR);
            }
        }
        ResponseUtil.send(response,apiMsg);
    }
}
