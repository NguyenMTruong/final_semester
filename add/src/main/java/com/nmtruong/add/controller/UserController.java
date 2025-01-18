package com.nmtruong.add.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nmtruong.add.dto.User.request.UserRequest;
import com.nmtruong.add.service.model.UserService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = ("http://localhost:5173"))
public class UserController {

    private final static String UPLOAD_DIR = "upload/";
    

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return userService.getAll();
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(
        @PathParam(value = "query") String query
    ){
        if (query == "" || query == null)
            return userService.getAll();
        else return userService.search(query);
    }

    @GetMapping("/post/{username}")
    public ResponseEntity<?> getUserPost(
        @PathVariable String username
    ){
        return userService.getPostUser(username);
    }

    @GetMapping("/comment/{username}")
    public ResponseEntity<?> getUserComment(
        @PathVariable String username
    ){
        return userService.getCommentUser(username);
    }

    @GetMapping("/repost/{username}")
    public ResponseEntity<?> getUserRepost(
        @PathVariable String username
    ){
        return userService.getRepostUser(username);
    }
    
    @GetMapping("/active")
    public ResponseEntity<?> getActive(
    ) {
        return userService.getActive();
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> get(
        @PathVariable String username
    ) {
        return userService.get(username);
    }

    @PostMapping("/follow/{username}")
    public ResponseEntity<?> follow(
        @PathVariable String username
    ){
        return userService.follow(username);
    }

    @PutMapping
    public ResponseEntity<?> update(
        @RequestParam("username") String username,
        @RequestParam("fullname") String fullname,
        @RequestParam("title") String title,
        @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ){
        UserRequest request = new UserRequest();
        request.setUsername(username);
        request.setFullname(fullname);
        request.setTitle(title);
        if (avatar != null){
            try {
                String fileName = UUID.randomUUID()+"_avatar_"+avatar.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, avatar.getBytes());

                String fileUrl = "http://localhost:8283/images/" + fileName;
                request.setAvatar(fileUrl);
            } catch (Exception e) {
                request.setAvatar("");
            }
        }
        return userService.update(request);
    }

}
