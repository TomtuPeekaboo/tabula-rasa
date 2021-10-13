package com.rasa.demo.utils;

import java.text.MessageFormat;
import java.util.List;

/**
 * @author 86138
 * 反射拼接sql
 */
public class SqlUtil {
    /**
     * 拼接update中的set字段  xxx=xxx
     */
    public static String setSql(String name, Object value, List<Object> list){
        list.add(value);
        return name+=" = ? ";
    }

    /**
     * 拼接where中and字段
     * @param key
     * @param value
     * @param list
     * @return
     */
    public static String andSql(String key,Object value,List<Object> list){
        list.add(value);
        String base="and {0} = ? ";
        return MessageFormat.format(base,key);
    }

    public static String insertSql(int number){
        StringBuilder sb=new StringBuilder();
        for(int i=0;i<number;i++){
            sb.append(i==number-1?"?":"?,");
        }
        return sb.toString();
    }
}
