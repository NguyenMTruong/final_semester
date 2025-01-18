package com.nmtruong.add.service.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.dto.article.request.ArticleRequest;
import com.nmtruong.add.entity.Article;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.mapper.ArticleMapper;
import com.nmtruong.add.repository.ArticleRepository;
import com.nmtruong.add.repository.UserRepository;

@Service
public class ArticleService {

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ResponseEntity<?> getAll(String username) {
        return ResponseEntity.ok(
            articleRepository.findAll()
            .stream().map(a -> articleMapper.toArticleResMin(a, username)).toList()
        );
    }

    @Transactional
    public ResponseEntity<?> search(String query) {
        List<Article> allPosts = articleRepository.findAll();
        List<Article> res = allPosts.stream().filter(post ->
            post.getContent().toLowerCase().contains(query.toLowerCase())
        ).distinct().toList();
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return ResponseEntity.ok(
            res.stream().map(a-> articleMapper.toArticleResMin(a, username)).toList()
        );
    }

    public ResponseEntity<?> create(ArticleRequest request) {
        Article art  = new Article();

        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("Not found in create Post"));
        art.setUsername(request.getUsername());
        art.setContent(request.getContent());
        art.setImages(request.getImages());

        art.setLikes(new ArrayList<>());
        art.setShares(new ArrayList<>());
        art.setReposts(new ArrayList<>());
        art.setComments(new ArrayList<>());

        Article save = articleRepository.save(art);

        user.addPost(save.getArticleId());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> get(String artId) {
        Optional<Article> art = articleRepository.findByArticleId(artId);
        if (!art.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(
            articleMapper.toArticleResComment(art.get())
        );
    }
    
    public ResponseEntity<?> likePost(String postId, String username) {
        Optional<User> you = userRepository.findByUsername(username);
        if (!you.isPresent())
            return ResponseEntity.status(403).build();
        Optional<Article> post = articleRepository.findByArticleId(postId);

        if (!post.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Like post");


        if (post.get().getLikes().contains(username)){
            you.get().removePostLike(postId);
            post.get().removeLike(username);}
        else {post.get().addLike(you.get().getUsername());
        you.get().addPostLike(postId);}
        Article save = articleRepository.save(post.get());
        userRepository.save(you.get());

        return ResponseEntity.ok(articleMapper.toArticleResMin(save, username));
    }

    public ResponseEntity<?> repostPost(String postId, String username) {
        Optional<User> you = userRepository.findByUsername(username);
        if (!you.isPresent())
            return ResponseEntity.status(403).build();

        Optional<Article> post = articleRepository.findByArticleId(postId);

        if (!post.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Like post");
        if (post.get().getReposts().contains(username)){
            you.get().removePostRepost(postId);
            post.get().removeRepost(username);}
        else {post.get().addRepost(you.get().getUsername());
        you.get().addPostRepost(postId);}
        Article save = articleRepository.save(post.get());
        userRepository.save(you.get());

        return ResponseEntity.ok(articleMapper.toArticleResMin(save, username));
    }

}
