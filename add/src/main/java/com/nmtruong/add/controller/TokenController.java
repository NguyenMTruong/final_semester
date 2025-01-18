package com.nmtruong.add.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nmtruong.add.service.authenticate.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/token")
@CrossOrigin(origins = ("http://localhost:5173"))
public class TokenController {

    @Autowired
    private AuthService authService;
    
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
        HttpServletRequest request,
        HttpServletResponse response
    ){
        return authService.refreshToken(request, response);
    }
}
