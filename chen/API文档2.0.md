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

# 登录功能


```


# 登录功能

​```json
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



# 发表动态功能

```json
方法：get
url：getDynamicServlet?start=x          (此处的x是指从第几个动态开始查询)

情况1：获取成功
{

	code:200
	message:"获取动态成功"
   data:[        //此处的data是动态列表（最多有五条）  可以先判断这里有多少条，在创建循环语句
   {
   id=1,      //动态的id
   authodId=3,  //用户的id值，获取到这个值
   content='我来了',   //内容
   imgFiles='xxxx',		//图片的地址
   time='202022',		//发表时间
   topicContent='我来了', 	//话题  （可能为空）
   range='public', //可见范围（可以不用管）
   zcount=3165, //点赞的数量
   ccount=5456,	//评论的数量
   imgcount=565 //图片的张数（可以用来判断该放多少张照片）
   },
   {
   id=1, 
   authodId=3,
   content='我来了',
   imgFiles='xxxx',
   time='202022', 
   topicContent='我来了',
   range='public',
   zcount=3165,
   ccount=5456,
   imgcount=565
   }
  ]
}



情况2：
{
    code:400
    message:"获取失败"
    data:null;
}
```



# 获取用户信息

```json
方法：get
url：getUserServlet?id=x   （x为用户的id值  在获取动态或者别的情况下 已经获取到的id值）
{
code:200,
message:"OK",
data:		     
        {
        "id":3,    //用户id
        "username":"a",    //用户名
        "password":null,    
        "email":"null",   //邮箱信息
        "phone":"18475135184",  //手机号码
        "type":"隔离",  //状态
        "province":"广东",  //省
        "city":"广州",    //市
        "county":"天河",   //区
        "head":xxxx      //头像地址
        }
}
```

# 获取用户头像

```json
方法：get
url：getUserHeadServlet?userid=x  (x是指用户的id)
此处的url要写在 <img src=> 这  
```

