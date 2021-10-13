package com.rasa.demo.web.servlet.verification;

import com.rasa.demo.common.enums.ApiInfo;
import com.rasa.demo.common.factory.ServiceProxyFactory;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.pojo.vo.ApiMsg;
import com.rasa.demo.service.UserService;
import com.rasa.demo.utils.MailUtil;
import com.rasa.demo.utils.ResponseUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.Random;

@WebServlet(name = "sendMailServlet", value = "/sendMailServlet")
public class SendMailServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email=request.getParameter("email");
        //创建一个user对象
        User user=new User();
        user.setEmail(email);

        UserService userService= ServiceProxyFactory.getUserService();
        User realUser=userService.getUser(user);
        ApiMsg apiMsg=null;
        if(realUser!=null){
            //存在该用户
            //获取随机生成的验证码
            String code=getCheckCode();
            //将code 存入 session
            request.getSession().setAttribute("password_code",code);
            //发送邮件
            MailUtil mail=new MailUtil(user.getEmail(),"找回密码","您在tabula rasa 的验证码是:"+code,realUser.getUsername());
            mail.sendMail();
            apiMsg=new ApiMsg(ApiInfo.OK,"发送成功！");
        }else{
            apiMsg=new ApiMsg(ApiInfo.Email_ERROR);
        }
        ResponseUtil.send(response,apiMsg);
    }


    /**
     * 产生6位随机字符串
     */
    private String getCheckCode() {
        String base = "0123456789ABCDEFGabcdefg";
        int size = base.length();
        Random r = new Random();
        StringBuffer sb = new StringBuffer();
        for(int i=1;i<=6;i++){
            //产生0到size-1的随机值
            int index = r.nextInt(size);
            //在base字符串中获取下标为index的字符
            char c = base.charAt(index);
            //将c放入到StringBuffer中去
            sb.append(c);
        }
        return sb.toString();
    }
}
