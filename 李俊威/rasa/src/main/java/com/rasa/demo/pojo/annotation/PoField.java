package com.rasa.demo.pojo.annotation;

import java.lang.annotation.*;

/**
 * @author 86138
 */

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface PoField {


    /**
     * 该成员变量对应的数据库表中的字段名
     */
    String value();

    /**
     * 决定插入的时候是否需要插入该变量
     */
    boolean insertIgnore() default false;

    /**
     * 决定更改的时候是否需要更改该变量
     */
    boolean update() default true;
}
