package com.rasa.demo.common.Proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

/**
 * 代理模式工厂类
 * @author 86138
 */
@SuppressWarnings("unchecked")
public class ProxyFactory {
    /**
     * 获取代理的对象
     * @param clazz 对象对应着的类的字节码文件
     * @param invocationHandler 实现方法的处理器
     * @param <T>
     * @return
     */
    private static <T> T getInstance(Class<T> clazz, InvocationHandler invocationHandler){
        return (T) Proxy.newProxyInstance(clazz.getClassLoader(), clazz.getInterfaces(), invocationHandler);
    }

    /**
     *
     * @param object 传入的实体类
     * @param <T>
     * @return  被代理后的对象
     */
    public static <T> T getInstanceByObject(T object){
        return (T)getInstance(object.getClass(),ProxyTransaction.creat(object));
    }

    public static <T> T getInstanceByClss(Class<T> clazz) throws InstantiationException, IllegalAccessException {
        return (T)getInstance(clazz,ProxyTransaction.creat(clazz.newInstance()));
    }
}
