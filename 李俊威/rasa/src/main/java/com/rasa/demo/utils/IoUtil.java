package com.rasa.demo.utils;

import java.io.Closeable;
import java.io.IOException;

/**
 * @author 86138
 * io流关闭的方法类
 */
public class IoUtil {
    public static void close(Closeable closeable){
        if(closeable!=null){
            try {
                closeable.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
