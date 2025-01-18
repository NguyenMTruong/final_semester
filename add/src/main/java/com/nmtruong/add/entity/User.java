package com.nmtruong.add.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
@Document(collection = "users")
public class User implements UserDetails{

    @Id
    private String userId;
    private String username;
    private String password;
    
    private String avatar;
    private String title;
    private String fullname;
    private String role;

    private List<String> follows;
    private List<String> followers;

    private List<String> posts;
    private List<String> postLikes;
    private List<String> postSaves;
    private List<String> postReposts;

    private List<String> comments;
    private List<String> commentLikes;

    // Method
    public void addFollow(String param) {
        this.getFollows().add(param);
    }
    public void removeFollow(String param) {
        this.getFollows().remove(param);
    }
    
    public void addFollower(String param) {
        this.getFollowers().add(param);
    }
    public void removeFollower(String param) {
        this.getFollowers().remove(param);
    }

    public void addPost(String param) {
        this.getPosts().add(param);
    }
    public void removePost(String param) {
        this.getPosts().remove(param);
    }

    public void addPostLike(String param) {
        this.getPostLikes().add(param);
    }
    public void removePostLike(String param) {
        this.getPostLikes().remove(param);
    }

    public void addPostSave(String param) {
        this.getPostSaves().add(param);
    }
    public void removePostSave(String param) {
        this.getPostSaves().remove(param);
    }

    public void addPostRepost(String param) {
        this.getPostReposts().add(param);
    }
    public void removePostRepost(String param) {
        this.getPostReposts().remove(param);
    }

    public void addComment(String param) {
        this.getComments().add(param);
    }
    public void removeComment(String param) {
        this.getComments().remove(param);
    }

    public void addCommentLike(String param) {
        this.getCommentLikes().add(param);
    }
    public void removeCommentLike(String param) {
        this.getCommentLikes().remove(param);
    }

    // Override Method
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.getRole()));
    }
    
}
