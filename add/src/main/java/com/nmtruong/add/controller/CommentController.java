package com.nmtruong.add.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nmtruong.add.dto.comment.request.CommentRequest;
import com.nmtruong.add.service.global.UploadFile;
import com.nmtruong.add.service.model.CommentService;

@RestController
@RequestMapping("/comments")
@CrossOrigin(origins = ("http://localhost:5173"))
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> create(
        @RequestParam("postId") String postId,
        @RequestParam("content") String content,
        @RequestParam(value = "files", required = false) MultipartFile[] files
    ){
        CommentRequest request = new CommentRequest();
        request.setPostId(postId);
        request.setContent(content);
        if (files != null && files.length > 0) {
            request.setImages(UploadFile.upload(files));
        } else request.setImages(new ArrayList<>());
        request.setUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return commentService.create(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(
        @PathVariable String id
    ) {
        return commentService.get(id);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<?> likeComment(
        @PathVariable String id
    ){
        return ResponseEntity.ok().build();
    }
}
