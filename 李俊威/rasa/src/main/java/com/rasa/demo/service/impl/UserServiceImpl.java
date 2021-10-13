package com.rasa.demo.service.impl;

import com.rasa.demo.common.factory.DaoFactory;
import com.rasa.demo.dao.UserDao;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.service.UserService;

/**
 * @author 86138
 */
public class UserServiceImpl implements UserService {
    /**获取userdao对象*/
    UserDao userdao= DaoFactory.getUserDao();


    /**
     * 得到对象
     * @param user
     * @return
     */
    @Override
    public User getUser(User user) {
        return userdao.getUser(user);
    }

    /**
     * 注册
     * @param user
     * @return
     */
    @Override
    public Boolean register(User user) {
        if(userdao.getUser(user)==null){
            int i=userdao.insertUser(user);
            return false;
        }else{
            return true;
        }

    }


    /**
     * 重置密码
     * @param user
     */
    @Override
    public void resetPassword(User user) {
        User realUser=userdao.getUser(user);
        realUser.setPassword(user.getPassword());
        userdao.update(realUser);
    }
}
