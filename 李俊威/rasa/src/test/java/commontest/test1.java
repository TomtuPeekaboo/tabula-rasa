package commontest;

import com.rasa.demo.common.enums.ApiInfo;
import org.junit.Test;

public class test1 {

    @Test
    public void apiInfoTest(){
        System.out.println(ApiInfo.USER_EXIST.getCode());
    }
}
