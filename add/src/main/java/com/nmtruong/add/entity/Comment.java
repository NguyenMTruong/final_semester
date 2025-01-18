package com.nmtruong.add.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "comments")
public class Comment {

    @Id
    private String commentId;
    private String username;
    private String postId;
    private String parentId;

    private String content;
    private List<String> images;

    private List<String> likes;
    private List<String> replies;

    // Method
    public void addLike(String param) {
        this.getLikes().add(param);
    }
    public void removeLike(String param) {
        this.getLikes().remove(param);
    }

    public void addReply(String param) {
        this.getReplies().add(param);
    }
    public void removeReply(String param) {
        this.getReplies().remove(param);
    }
    
}
