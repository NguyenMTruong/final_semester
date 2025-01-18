package com.nmtruong.add.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import com.nmtruong.add.entity.Token;
import com.nmtruong.add.repository.TokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class CustomLogoutHandler implements LogoutHandler{
    @Autowired
    private TokenRepository tokenRepository;
    @Override
    public void logout(
        HttpServletRequest request, 
        HttpServletResponse response, 
        Authentication authentication
    ) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        
        if (authHeader ==  null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String token = authHeader.substring(7);
        Token stored = tokenRepository.findByAccessToken(token).orElse(null);

        if (stored != null) {
            stored.setLoggedOut(true);
            tokenRepository.save(stored);
        }
        
    }
}
