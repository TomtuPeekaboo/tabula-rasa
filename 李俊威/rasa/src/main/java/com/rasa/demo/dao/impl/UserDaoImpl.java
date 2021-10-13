package com.rasa.demo.dao.impl;

import com.rasa.demo.dao.DaoMapper;
import com.rasa.demo.dao.UserDao;
import com.rasa.demo.pojo.po.User;

import java.sql.SQLException;
import java.sql.SQLOutput;

public class UserDaoImpl extends DaoMapper<User> implements UserDao {


    @Override
    public String getTableName() {
        return "user";
    }


    @Override
    public String getQueryCondition(User po) {
        String format = null;
        if (po.getId() != 0) {
            // 如果传入的对象中包含了id属性，则使用id查询
            format = " id = " + po.getId();
        } else if (po.getUsername()!=null){
            //传入了username
            format = " username = '"+po.getUsername()+"'";
        }else if(po.getPhone()!=null){
            format = " phone = '"+po.getPhone()+"'";
        }else if(po.getEmail()!=null){
            format=" email = '"+po.getEmail()+"'";
        }
        return format;
    }

    /**
     * 获得对象
     * @param user
     * @return
     */
    @Override
    public User getUser(User user) {
        try {
            return selectOne(user);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    /**
     * 插入
     * @param user
     * @return
     */
    @Override
    public int insertUser(User user){

        try {
            int i=insertOne(user);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }

    /**
     * 更新
     */
    @Override
    public void update(User user) {
        try {
            updateOne(user);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
