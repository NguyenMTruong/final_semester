package com.nmtruong.add.dto.User.response;

import lombok.Data;

@Data
public class UserAuthRes {
    private String username;
    private String avatar;
    private String fullname;
    private String title;
    private int follows;
    private boolean follow;
}
