package com.rasa.demo.dao;

import com.rasa.demo.utils.JdbcUtils;
import com.rasa.demo.utils.ReflectUtil;
import com.rasa.demo.utils.SqlUtil;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;

import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.*;

/**
 * 所有Dao类的父类，实现了CRUD的sql语句拼装，和常见的CRUD方法
 * @author 86138
 */
@SuppressWarnings("unchecked")
public abstract class DaoMapper <T>{

    /**
     * 获取表名 具体由子类实现 （模板方法）
     * @return
     */
    public abstract String getTableName();

    /**
     * 拼接查询条件，具体由子类实现
     * @param po
     * @return
     */
    public abstract String getQueryCondition(T po);


    /**
     * 增
     * @param po
     * @return
     * @throws SQLException
     */
    public int insertOne(T po) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        List<Object> list=new ArrayList<>();

        String base="insert into {0} ({1}) values ({2})";

        String sql= MessageFormat.format(base,getTableName(),ReflectUtil.setSqlForInsert(po,list), SqlUtil.insertSql(list.size()));

        BigInteger bigInteger;

        Object[] insert=queryRunner.insert(sql,new ArrayHandler(),list.toArray());

        if(insert.length>=1){
            bigInteger=(BigInteger) insert[0];
        }else{
            return 0;
        }
        return bigInteger.intValue();
    }

    /**
     * 删
     * @param id
     * @return
     * @throws SQLException
     */
    public int deleteOne(int id) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        String base="delete from {0} where id=?";
        String sql=MessageFormat.format(base,getTableName());
        return queryRunner.update(sql,new Object[]{id});
    }

    public int deleteOne(T po) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        String base="delete from {0} where {1}";
        String sql=MessageFormat.format(base,getTableName(),getQueryCondition(po));
        return queryRunner.update(sql);
    }


    /**
     * 改
     */

    public int updateOne(T po) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        String base="update {0} {1} where {2}";
        //参数
        List<Object> params=new ArrayList<>();
        //更改的参数值
        String sqlUpdate=ReflectUtil.setSqlForUpdate(po,params);
        //查询条件
        String condition=getQueryCondition(po);
        String sql=MessageFormat.format(base,getTableName(),sqlUpdate,condition);
        return queryRunner.update(sql,params.toArray());
    }


    /**
     * 查
     */
    public T selectOne(T po) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        String base="select * from {0} where {1} ";
        String sql=MessageFormat.format(base,getTableName(),getQueryCondition(po));
        Map<String,Object> map=queryRunner.query(sql,new MapHandler());
        T object=null;
        try {
            object=(T)po.getClass().newInstance();
            //说明不存在这个用户
            if(map==null){
                return null;
            }
            BeanUtils.populate(object,map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return object;
    }

    public List<T> selectObjectList(T object) throws SQLException {
        QueryRunner queryRunner=new QueryRunner(JdbcUtils.getDataSource());
        String base="select * from {0} where {1}";
        String sql=MessageFormat.format(base,getTableName(),getQueryCondition(object));
        List<T> res=new ArrayList<>();
        List<Map<String,Object>> list=queryRunner.query(sql,new MapListHandler());
        if(list==null){
            return null;
        }
        Iterator<Map<String,Object>> iterator=list.iterator();
        while(iterator.hasNext()){
            try {
                T t=(T)object.getClass().newInstance();
                BeanUtils.populate(t,iterator.next());
                res.add(t);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                e.printStackTrace();
            }

        }
        return res;
    }
}
