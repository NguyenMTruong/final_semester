package com.nmtruong.add.dto.User.request;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String fullname;
    private String avatar;
    private String email;
    private String password;
    private String role;
    private String title;
}
