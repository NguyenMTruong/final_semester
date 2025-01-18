package com.nmtruong.add.dto.comment.request;

import java.util.List;

import lombok.Data;

@Data
public class CommentRequest {
    private String commentId;
    private String username;
    private String postId;
    private String parentId;
    
    private String content;
    private List<String> images;
}
