package com.rasa.demo.pojo.po;

import com.rasa.demo.pojo.annotation.PoField;
import javafx.scene.chart.ValueAxis;

public class User {
    @PoField(value = "id",update = false)
    private  int id;
    @PoField(value = "username")
    private String username;
    @PoField(value = "password")
    private String password;
    @PoField(value = "email")
    private String email;
    @PoField(value = "phone")
    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
