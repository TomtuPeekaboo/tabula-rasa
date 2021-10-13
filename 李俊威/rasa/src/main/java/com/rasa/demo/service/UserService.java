package com.rasa.demo.service;

import com.rasa.demo.common.factory.DaoFactory;
import com.rasa.demo.dao.UserDao;
import com.rasa.demo.pojo.po.User;

public interface UserService {



    /**
     *返回user对象
     * @return user对象
     */
    User getUser(User user);


    /**
     * 是否注册成功
     * @return 是否注册成功
     */
    Boolean register(User user);


    /**
     * 重置密码
     */
    public void resetPassword(User user);

}
