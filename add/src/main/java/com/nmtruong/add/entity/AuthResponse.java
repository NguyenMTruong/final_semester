package com.nmtruong.add.entity;

import com.nmtruong.add.dto.User.response.UserAuthRes;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private UserAuthRes user;

    public AuthResponse(String access, String refresh, UserAuthRes username){
        this.setAccessToken(access);
        this.setRefreshToken(refresh);
        this.setUser(username);
    }
}
