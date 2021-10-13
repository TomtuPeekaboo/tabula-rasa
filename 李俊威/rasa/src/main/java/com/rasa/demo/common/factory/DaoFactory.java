package com.rasa.demo.common.factory;

import com.rasa.demo.dao.UserDao;
import com.rasa.demo.dao.impl.UserDaoImpl;

public class DaoFactory {

    /**
     * 获取User表的dao层对象
     */
    public static UserDao getUserDao(){
        return new UserDaoImpl();
    }
}
