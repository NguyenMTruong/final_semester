package com.nmtruong.add.dto.comment.response;

import java.util.List;

import com.nmtruong.add.dto.User.response.UserAuthRes;

import lombok.Data;

@Data
public class CommentResponse {

    private String id;
    private UserAuthRes user;
    private String postId;
    private String parentId;

    private String content;
    private List<String> images;

    private boolean isLike;
    
}
