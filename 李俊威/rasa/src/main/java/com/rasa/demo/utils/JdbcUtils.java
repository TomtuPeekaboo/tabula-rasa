package com.rasa.demo.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author 86138
 */
public class JdbcUtils {
    /**
     * 数据源
     */
    private static DataSource ds=null;

    /**
     * 利用ThreadLocal保证多线程的时候连接池的安全
     */
    private  static ThreadLocal<Connection> connectionThreadLocal=new ThreadLocal<Connection>();


    /**
     * 用静态方法 第一次调用jdbc的时候就读取配置文件初始化数据池
     */
    static{
        Properties properties=new Properties();
        InputStream is=JdbcUtils.class.getClassLoader().getResourceAsStream("druid.properties");
        try {
            properties.load(is);
            ds= DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            IoUtil.close(is);
        }
    }

    /**
     * 获取连接池
     */
    public static DataSource getDataSource(){
        return ds;
    }


    /**
     * 获取数据库连接
     */
    public static Connection getConnection() {
        Connection conn = connectionThreadLocal.get();
        //第一次连接就创建一个新的连接
        if (conn == null) {
            try {
                conn = ds.getConnection();
                connectionThreadLocal.set(conn);
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
                return conn;
    }


    /**
     * 开启事务
     */

    public static Connection beginTransaction() throws SQLException {
        Connection conn=getConnection();
        //关闭自动提交
        conn.setAutoCommit(false);
        return conn;
    }


    /**
     * 提交事务
     */
    public static void commitTransaction() throws SQLException {
        Connection conn=getConnection();
        if(conn!=null){
            conn.commit();
        }
    }

    /**
     * 回滚事务
     */
    public static void rollbackTransaction() throws SQLException {
        Connection conn=getConnection();
        if(conn!=null){
            conn.rollback();
        }
    }


    /**
     * 结束事务关闭连接
     */
    public static void closeTransaction() throws SQLException {
        Connection conn=getConnection();
        if(conn!=null){
            conn.close();
        }
        connectionThreadLocal.remove();
    }

}
