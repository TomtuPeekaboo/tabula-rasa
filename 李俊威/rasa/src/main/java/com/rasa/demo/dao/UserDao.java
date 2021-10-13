package com.rasa.demo.dao;

import com.rasa.demo.pojo.po.User;

/**
 * @author 86138
 * user表的dao层
 */
public interface UserDao {

    /**
     * 获取user对象
     * @return
     */
    User getUser(User user);

    /**
     * 插入
     * @param user
     * @return
     */
    int insertUser(User user);

    /**
     * 更新
     * @param user
     */
    void update(User user);
}
