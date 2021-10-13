package com.rasa.demo.utils;

import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * 从request中获取参数 返回封装的对象
 * @param <T>
 */
public class MapUtil<T> {

    /**
     * 根据参数返回对象
     * @param map  表单的参数
     * @param tClass 对象的字节码文件
     * @param <T>
     * @return
     */
    public static  <T> T getObject(Map<String, String[]> map,Class<T> tClass){
        T object=null;
        try {
            object=(T)tClass.newInstance();
            BeanUtils.populate(object,map);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        return object;
    }
}
