package com.rasa.demo.utils;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

/**
 * @author 86138
 */
public class MailUtil {
    /**
     * 发件人的邮箱 和 smtp的密码
     */
    public static String myEmailAccount="1046040786@qq.com";
    public static String myEmailPassword = "glhyrhtmkimmbbjd";

    /**
     * qq邮箱的 SMTP 服务器地址
     */
    public static String myEmailSMTPHost="stmp.qq.com";

    /**收件人邮箱*/
    private   String receiveMailAccount;
    private String setSubject;
    private String content;
    private String username;


    /**
     *
     * @param receiveMailAccount  收件人邮箱
     * @param setSubject 主题
     * @param content 内容
     * @param username 用户名
     */
    public MailUtil(String receiveMailAccount,String setSubject,String content,String username){
        this.receiveMailAccount=receiveMailAccount;
        this.content=content;
        this.setSubject=setSubject;
        this.username=username;
    }

    public void sendMail(){
        //配置参数
        Properties properties=new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.host", myEmailSMTPHost);
        properties.setProperty("mail.smtp.auth", "true");

        //根据配置创建会话对象
        Session session=Session.getInstance(properties);
        //设置debug
        session.setDebug(true);

        //创建邮件
        try {
            MimeMessage message=createMimeMessage(session,myEmailAccount,receiveMailAccount);
            //根据session获取传输对象
            Transport transport=session.getTransport();
            transport.connect(myEmailAccount,myEmailPassword);
            //添加所有收件人
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        } {

        }
    }




    /**
     * 创建邮件
     * @param session  和服务器交互的会话
     * @param sendMail 发件人的邮箱
     * @param receiveMail 收件人的邮箱
     * @return
     */
    public  MimeMessage createMimeMessage(Session session,String sendMail,String receiveMail) throws UnsupportedEncodingException, MessagingException {
        //创建一封邮件
        MimeMessage message=new MimeMessage(session);

        //发件人
        message.setFrom(new InternetAddress(sendMail,"rasa","UTF-8"));

        //收件人
        message.setRecipient(MimeMessage.RecipientType.TO,new InternetAddress(receiveMail,username+"用户","UTF-8"));

        message.setSubject(setSubject,"UTF-8");

        message.setContent(content,"text/html;charset=UTF-8");

        message.setSentDate(new Date());

        message.saveChanges();
        return message;
    }
}
