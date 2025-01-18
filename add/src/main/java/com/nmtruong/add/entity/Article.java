package com.nmtruong.add.entity;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "articles")
public class Article {

    @Id
    private String articleId;
    private String username;

    private String content;
    private List<String> images;

    private LocalDate createAt;

    private List<String> likes;
    private List<String> shares;
    private List<String> reposts;

    private List<String> comments;

    public void addLike(String id) {
        this.getLikes().add(id);
    }
    public void addRepost(String id) {
        this.getReposts().add(id);
    }
    public void addComment(String id) {
        this.getComments().add(id);
    }

    public void removeLike(String id) {
        this.getLikes().remove(id);
    }
    public void removeRepost(String id) {
        this.getReposts().remove(id);
    }
    public void removeComment(String id) {
        this.getComments().remove(id);
    }
    
}
