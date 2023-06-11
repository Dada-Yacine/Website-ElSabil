package com.example.demo;

public class reponse {
    private String message;
    private boolean success;
    private Object data;
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public reponse(String message, boolean success, Object data, String token) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.token = token;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }

    public Object getData() {
        return data;
    }
}
