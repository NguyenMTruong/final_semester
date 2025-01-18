package com.nmtruong.add.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "tokens")
public class Token {

    @Id
    private String tokenId;
    private String accessToken;
    private String refreshToken;
    private String username;
    private boolean loggedOut;
    
}
