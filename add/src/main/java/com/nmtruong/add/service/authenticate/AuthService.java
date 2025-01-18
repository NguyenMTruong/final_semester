package com.nmtruong.add.service.authenticate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.dto.User.request.UserAuth;
import com.nmtruong.add.dto.User.request.UserRequest;
import com.nmtruong.add.dto.User.response.UserAuthRes;
import com.nmtruong.add.entity.AuthResponse;
import com.nmtruong.add.entity.Token;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.mapper.UserMapper;
import com.nmtruong.add.repository.TokenRepository;
import com.nmtruong.add.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    private void saveUserToken(String access, String refresh, User user) {
        Token token = new Token();
        token.setAccessToken(access);
        token.setRefreshToken(refresh);
        token.setUsername(user.getUsername());
        token.setLoggedOut(false);
        tokenRepository.save(token);
    }

    private void revokeAllTokenByUser(String username) {
        List<Token> validToken = tokenRepository.findAllByUsername(username)
            .stream()
            .filter(t -> !t.isLoggedOut())
            .toList();

        if (validToken.isEmpty()) return;

        validToken.forEach(t -> t.setLoggedOut(true));

        tokenRepository.saveAll(validToken);
    }

    @Transactional
    public ResponseEntity<?> authenticate(UserAuth auth) {
        Optional<User> user = userRepository.findByUsername(auth.getUsername());
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Username wrong");

        if (!passwordEncoder.matches(auth.getPassword(), user.get().getPassword()))
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY)
                .body("Password wrong");

        String accessToken = jwtService.generateAccessToken(user.get());
        String refreshToken = jwtService.generateRefreshToken(user.get());

        revokeAllTokenByUser(auth.getUsername());
        saveUserToken(accessToken, refreshToken, user.get());

        return ResponseEntity.ok(
            new AuthResponse(accessToken, refreshToken, userMapper.toUserAuthRes(user.get()))
        );
    }

    @Transactional
    public ResponseEntity<?> register(UserRequest request) {
        Optional<User> check = userRepository.findByUsername(request.getUsername());
        if (check.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Username already exists");

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setFullname(request.getFullname());
        user.setAvatar(request.getAvatar());
        user.setTitle(request.getTitle());
        user.setRole(
            user.getRole() == null ? "USER"
            : user.getRole()
        );
        
        user.setFollows(new ArrayList<>());
        user.setFollowers(new ArrayList<>());

        user.setPosts(new ArrayList<>());
        user.setPostLikes(new ArrayList<>());
        user.setPostSaves(new ArrayList<>());
        user.setPostReposts(new ArrayList<>());

        user.setComments(new ArrayList<>());
        user.setCommentLikes(new ArrayList<>());

        User save = userRepository.save(user);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken= jwtService.generateRefreshToken(user);

        saveUserToken(accessToken, refreshToken, save);

        return ResponseEntity.ok(
            new AuthResponse(accessToken, refreshToken, userMapper.toUserAuthRes(save))
        );
    }
    
    @Transactional
    public ResponseEntity<?> refreshToken(
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        String access = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refresh = request.getHeader("refresh");

        if (access != null 
        && access.startsWith("Bearer ")
        && jwtService.isExpiration(access.substring(7)))
            return ResponseEntity.ok(
                new AuthResponse(access, refresh, new UserAuthRes())
            );

        try{
            if (refresh == null || !refresh.startsWith("Bearer "))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Authorization header is missing or invalid");
            
            String token = refresh.substring(7);

            String username = jwtService.extractUsername(token);

            User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("No found user with username: "+username));

            if (!jwtService.isValidRefreshToken(token, user))
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid refresh token");

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            revokeAllTokenByUser(username);
            saveUserToken(accessToken, refreshToken, user);

            return ResponseEntity.ok(
                new AuthResponse(accessToken, refreshToken, new UserAuthRes())
            );
        }catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
        }
    }

}
