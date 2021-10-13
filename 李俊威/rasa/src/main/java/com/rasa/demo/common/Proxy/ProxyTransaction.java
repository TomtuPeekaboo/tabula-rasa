package com.rasa.demo.common.Proxy;

import com.rasa.demo.utils.JdbcUtils;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.sql.SQLException;

/**
 * 代理事务类 处理真正的操作
 * @author 86138
 */
public class ProxyTransaction implements InvocationHandler {
    /**
     * 要代理的对象
     */
    private Object proxyobject;

    private ProxyTransaction(Object o){
        this.proxyobject=o;
    }

    /**
     * 创建代理对象
     * @param object
     * @param <T>
     * @return
     */
    public static <T> ProxyTransaction creat(T object){
        return new ProxyTransaction(object);
    }

    /**
     * 调用service层方法，代理连接、事务处理
     */
    @Override
    public Object invoke(Object proxy, Method method,Object[] args) throws SQLException {
        Object value = null;
        try {
            //开启事务
            JdbcUtils.beginTransaction();
            value=method.invoke(proxyobject,args);
        } catch (Exception throwables) {
            System.out.println("service出现异常，回滚");
            JdbcUtils.rollbackTransaction();
        }finally {
            //提交事务
            JdbcUtils.commitTransaction();
            //关闭事务
            JdbcUtils.closeTransaction();
        }
        return value;
    }
}

