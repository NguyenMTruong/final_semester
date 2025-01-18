package com.nmtruong.add.service.authenticate;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.repository.TokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration-access}")
    private long expirationAccess;
    @Value("${application.security.jwt.expiration-refresh}")
    private long expirationRefresh;

    @Autowired
    private TokenRepository tokenRepository;

    // Hash Key
    private SecretKey getSigninKey() {
        byte[] keys = Decoders.BASE64URL.decode(secretKey);
        return Keys.hmacShaKeyFor(keys);
    }

    // Valid Token
    @Transactional
    public boolean isExpiration(String token) {
        return !extractExpiration(token).before(new Date(System.currentTimeMillis()));
    }

    @Transactional
    public boolean isValidAccessToken(String token, UserDetails user) {
        String username = extractUsername(token);

        boolean validToken = tokenRepository
            .findByAccessToken(token)
            .map((t -> !t.isLoggedOut()))
            .orElse(false);

        return username.equals(user.getUsername()) && isExpiration(token) && validToken;
    }

    @Transactional
    public boolean isValidRefreshToken(String token, UserDetails user) {
        String username = extractUsername(token);

        boolean validToken = tokenRepository
            .findByRefreshToken(token)
            .map((t -> !t.isLoggedOut()))
            .orElse(false);

        return username.equals(user.getUsername()) && isExpiration(token) && validToken;
    }

    // Extract Token
    private Claims extractAllClaims(String token) {
        return Jwts
            .parser()
            .verifyWith(getSigninKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    @Transactional
    public <T> T extractClaim(String token, Function<Claims, T> resolve) {
        Claims claims = extractAllClaims(token);
        return resolve.apply(claims);
    }

    @Transactional
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    @Transactional
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Generate Token
    private String generateToken(UserDetails user, long expiration){
        return Jwts
            .builder()
            .subject(user.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigninKey())
            .compact();
    }

    @Transactional
    public String generateAccessToken(UserDetails user) {
        return generateToken(user, expirationAccess);
    }

    @Transactional
    public String generateRefreshToken(UserDetails user) {
        return generateToken(user, expirationRefresh);
    }

}
