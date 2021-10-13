package com.rasa.demo.web.filter;

import com.rasa.demo.common.factory.DaoFactory;
import com.rasa.demo.common.factory.ServiceProxyFactory;
import com.rasa.demo.dao.UserDao;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.service.UserService;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @author 86138
 */
@WebFilter("/signIn.html")
public class LoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse rep = (HttpServletResponse) response;
        HttpSession session = req.getSession();
        String username=null;
        String password=null;
        if (req.getCookies() != null) {
            Cookie[] cookies = req.getCookies();
            for (Cookie cookie : cookies) {
                if ("rasa_username".equals(cookie.getName())) {
                    username = cookie.getValue();
                }
                if ("rasa_password".equals(cookie.getName())) {
                    password = cookie.getValue();
                }
            }

            //免密登录的标志
            boolean flag=false;
            if(username!=null&password!=null){
                User user=new User();
                user.setUsername(username);
                UserService service= ServiceProxyFactory.getUserService();
                User realuser=service.getUser(user);
                if(realuser!=null){
                    if(realuser.getUsername().equals(username)&&realuser.getPassword().equals(password)){
                        flag=true;
                    }
                }
            }

            if(flag){
                rep.sendRedirect(req.getContextPath()+"/index.jsp");
            }else{
                req.getRequestDispatcher(req.getContextPath()+"/signIn.html");
            }

        }else{
            req.getRequestDispatcher(req.getContextPath()+"/signIn.html");
        }



         chain.doFilter(request, response);
    }
    @Override
    public void init(FilterConfig config) throws ServletException {
    }
    @Override
    public void destroy() {
    }


}
