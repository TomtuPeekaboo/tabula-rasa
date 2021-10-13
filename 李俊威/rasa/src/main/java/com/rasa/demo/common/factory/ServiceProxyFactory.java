package com.rasa.demo.common.factory;

import com.rasa.demo.service.UserService;
import com.rasa.demo.service.impl.UserServiceImpl;
import com.rasa.demo.common.Proxy.ProxyFactory;

/**
 * @author 86138
 * service的代理工厂类  利用这个工厂类返回service的代理对象
 */
public class ServiceProxyFactory {

    /**
     *获取经过代理后的UserService对象
     */
    public static UserService getUserService(){
        return ProxyFactory.getInstanceByObject(new UserServiceImpl());
    }
}