package com.nmtruong.add.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nmtruong.add.dto.article.request.ArticleRequest;
import com.nmtruong.add.service.global.UploadFile;
import com.nmtruong.add.service.model.ArticleService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = ("http://localhost:5173"))
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public ResponseEntity<?> getAll(
        @PathParam("username") String username
    ) {
        return articleService.getAll(username);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(
        @PathParam("query") String query
    ){
        return articleService.search(query);
    }

    @PostMapping
    public ResponseEntity<?> create(
        @RequestParam("username") String username,
        @RequestParam("content") String content,
        @RequestParam(value = "files", required = false) MultipartFile[] files
    ) {
        ArticleRequest request = new ArticleRequest();
        request.setUsername(username);
        request.setContent(content);
        if (files != null && files.length > 0) {
            request.setImages(UploadFile.upload(files));
        } else request.setImages(new ArrayList<>());
        return articleService.create(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(
        @PathVariable String id
    ){
        return articleService.get(id);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<?> likePost(
        @PathVariable String id,
        @RequestBody String username
    ){
        if(username == "=" || username == "")
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        return articleService.likePost(id, username.substring(0, username.length()-1));
    }

    @PostMapping("/repost/{id}")
    public ResponseEntity<?> repostPost(
        @PathVariable String id,
        @RequestBody String username
    ){
        if(username == "=" || username == "")
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
        return articleService.repostPost(id, username.substring(0, username.length()-1));
    }

}
