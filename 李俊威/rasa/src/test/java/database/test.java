package database;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rasa.demo.common.enums.ApiInfo;
import com.rasa.demo.pojo.po.User;
import com.rasa.demo.pojo.vo.ApiMsg;
import com.rasa.demo.utils.JdbcUtils;
import org.junit.Test;

import java.sql.Connection;

public class test {
    @Test
    public void test1(){
        Connection conn= JdbcUtils.getConnection();
        System.out.println(conn);
    }

    @Test
    public void jsontest(){
        User user=new User();
        user.setId(1);
        user.setEmail("sdasdas");
        user.setPassword("sdasdas");
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("user",user);
        System.out.println(jsonObject.toJSONString());
    }

    @Test
    public void jsontest1(){
        ApiMsg apiMsg=new ApiMsg(ApiInfo.CODE_ERROR);
        ObjectMapper mapper=new ObjectMapper();

        try {
            String json=mapper.writeValueAsString(apiMsg);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

    }
}
