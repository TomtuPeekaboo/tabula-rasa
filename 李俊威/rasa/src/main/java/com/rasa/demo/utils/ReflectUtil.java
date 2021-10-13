package com.rasa.demo.utils;
import com.rasa.demo.pojo.annotation.PoField;

import java.lang.reflect.Field;
import java.util.*;
/**
 * 反射工具类
 * @author 86138
 */
public class ReflectUtil {

    /**
     * 通过反射获取pojo类含有注解的字段
     * @param po
     * @param <T>
     * @return
     */
    public static <T> Map<String,Object> getParams(T po){
        Map<String,Object> map=new HashMap<>();
        return getFieldsMapUpdate(po,map);
    }

    /**
     * 通过反射获取pojo类的含有注解的方法
     * 包括父类
     * @param object
     * @param <T>
     * @return
     */
    public static <T> Field[] getAllFields(T object){
        Class<?> clazz=object.getClass();
        List<Field> fieldListdList=new ArrayList<>();
        while(clazz!=null){
            fieldListdList.addAll(new ArrayList<>(Arrays.asList(clazz.getDeclaredFields())));
            clazz=clazz.getSuperclass();
        }
        Field[] fields=new Field[fieldListdList.size()];
        fieldListdList.toArray(fields);
        return fields;
    }


    /**
     * 获取插入时需要的键值对列表
     * @param object
     * @param <T>
     * @return
     */
    public static <T> Map<String,Object> getParamForInsert(T object){
        Map<String,Object> map=new HashMap<>(6);
        return getFieldsMapInsert(object,map);
    }

    /**
     * 获取插入时需要的键值对列表
     * @param object
     * @param <T>
     * @return
     */
    public static <T> Map<String,Object> getParamForUpdate(T object){
        Map<String,Object> map=new HashMap<>();
        return getFieldsMapUpdate(object,map);
    }

    /**
     * 拼接update的sql语句
     * @param po
     * @param list
     * @param <T>
     * @return
     */
    public static <T> String setSqlForUpdate(T po,List<Object> list){
        //拼接update操作的sql  像set xxx=xxx；
        StringBuilder sb=new StringBuilder(" set ");
        //获取update的参数
        Map<String,Object> updateParams=getParamForUpdate(po);
        //遍历
        Iterator<Map.Entry<String,Object>> iterator=updateParams.entrySet().iterator();
        while(iterator.hasNext()){
            Map.Entry<String,Object> p= iterator.next();
            sb.append(SqlUtil.setSql(p.getKey(),p.getValue(),list));
            if(iterator.hasNext()){
                sb.append(" , ");
            }
        }
        return sb.toString();
    }

    /**
     * 插入时 拼接 values后面的 值，值，值
     * @param po
     * @param list
     * @param <T>
     * @return
     */
    public static <T> String setSqlForInsert(T po,List<Object> list){
        StringBuilder sb=new StringBuilder();
        Map<String,Object> paramForInsert=getParamForInsert(po);
        Iterator<Map.Entry<String,Object>> iterator=paramForInsert.entrySet().iterator();
        while(iterator.hasNext()){
            Map.Entry<String,Object> p= iterator.next();
            list.add(p.getValue());

            sb.append(p.getKey());
            if(iterator.hasNext()){
                sb.append(" , ");
            }
        }

        return sb.toString();
    }


    /**
     * 获取对象属性的map集合，用于插入
     * @param object
     * @param map
     * @param <T>
     * @return
     */
    public static <T> Map<String,Object> getFieldsMapInsert(T object,Map<String,Object> map){
        Class<?> clazz =object.getClass();
        for(Field field:clazz.getDeclaredFields()) {
            field.setAccessible(true);
            PoField poField = field.getAnnotation(PoField.class);
            if (poField != null) {

                addFieldsMap(field, poField, object, clazz, map, !poField.insertIgnore());
            }
        }
        return map;
    }


    /**
     * 获取对象属性的map集合，用于更新
     * @param object
     * @param map
     * @param <T>
     * @return
     */
    public static <T> Map<String,Object> getFieldsMapUpdate(T object,Map<String,Object> map){
        Class<?> clazz =object.getClass();
        for(Field field:clazz.getDeclaredFields()) {
            field.setAccessible(true);
            PoField poField = field.getAnnotation(PoField.class);
            if (poField != null) {
                addFieldsMap(field, poField, object, clazz, map, poField.update());
            }
        }
        return map;
    }


    /**
     * 将对象对应的属性名称和属性值添加到map中
     * @param field
     * @param poField
     * @param object
     * @param clazz
     * @param map
     * @param update
     * @param <T>
     */
    private static <T> void addFieldsMap(Field field, PoField poField, T object, Class<?> clazz, Map<String, Object> map, boolean update) {
        try {
            Object value= field.get(object);

            if(value!=null){
                if(poField!=null&&update){
                    map.put(poField.value(),value);
                }
            }else{
                if(poField!=null&&update){
                    map.put(poField.value(),"null");
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }




}
