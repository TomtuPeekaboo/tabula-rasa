package com.rasa.demo.web.servlet.verification;

import com.rasa.demo.common.enums.ApiInfo;
import com.rasa.demo.common.factory.ServiceProxyFactory;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.pojo.vo.ApiMsg;
import com.rasa.demo.service.UserService;
import com.rasa.demo.utils.ResponseUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "changePasswordServlet", value = "/changePasswordServlet")
public class ChangePasswordServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email=request.getParameter("email");
        String password=request.getParameter("password");
        String code=request.getParameter("code");
        String oldCode=(String) request.getSession().getAttribute("password_code");

        ApiMsg apiMsg;
        if(code.equals(oldCode)){
            User user=new User();
            user.setEmail(email);
            UserService service= ServiceProxyFactory.getUserService();
            service.resetPassword(user);
            apiMsg=new ApiMsg(ApiInfo.OK,"重置密码成功");
        }else{
            apiMsg=new ApiMsg(ApiInfo.CODE_ERROR);
        }

        ResponseUtil.send(response,apiMsg);
    }
}
