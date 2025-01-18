package com.nmtruong.add.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nmtruong.add.dto.User.request.UserAuth;
import com.nmtruong.add.dto.User.request.UserRequest;
import com.nmtruong.add.service.authenticate.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = ("http://localhost:5173"))
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody UserAuth auth
    ){
        return authService.authenticate(auth);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
        @RequestBody UserRequest request
    ){
        return authService.register(request);
    }

}
