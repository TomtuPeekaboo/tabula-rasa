# 注册功能



```
方法：post
url：registerServlet

情况1：验证码不正确
{
    code:104
    message:"验证码错误"
    data:null
}

情况2：用户名已存在
{
    code:101
    message:"用户已存在"
    data:null
}

情况3: 成功
{
    code:200
    message:"注册成功！"
    data：null
}
```


```


# 登录功能

```json
方法：post
url：loginServlet

情况1：登陆失败
{
    code:103
    message:"用户手机号码或密码不正确""
    data:null
}

情况2：登录成功
{
    code:200
    message:"登录成功！"
    data:null
}

情况3：登陆失败
{
    code:102
    message:"用户不存在""
    data:null
}


```

