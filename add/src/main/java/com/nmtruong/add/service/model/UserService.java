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

import com.nmtruong.add.dto.User.request.UserRequest;
import com.nmtruong.add.dto.article.response.ArticleResMin;
import com.nmtruong.add.dto.comment.response.CommentResMin;
import com.nmtruong.add.entity.Article;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.mapper.ArticleMapper;
import com.nmtruong.add.mapper.CommentMapper;
import com.nmtruong.add.mapper.UserMapper;
import com.nmtruong.add.repository.ArticleRepository;
import com.nmtruong.add.repository.CommentRepository;
import com.nmtruong.add.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(
            userRepository.findAll().stream()
                .map(userMapper::toUserAuthRes)
                .toList()
        );
    }

    @Transactional
    public ResponseEntity<?> search(String query) {
        List<User> users = userRepository.findAll();
        String lowerCaseQuery = query.toLowerCase();
        System.out.println(lowerCaseQuery);

        // Kết hợp cả tìm kiếm theo username và fullname
        List<User> result = users.stream()
            .filter(user -> 
                user.getUsername().toLowerCase().contains(lowerCaseQuery) ||
                user.getFullname().toLowerCase().contains(lowerCaseQuery)
            )
            .distinct() // Đảm bảo không có phần tử trùng lặp
            .toList();
        result.forEach(user -> {
                System.out.println(user.getUsername());
                System.out.println(user.getFullname());
                System.out.println("End User");
            });

        // Chuyển đổi danh sách kết quả thành DTO
        return ResponseEntity.ok(
            result.stream()
                .map(userMapper::toUserAuthRes)
                .toList()
        );

    }

    @Transactional
    public ResponseEntity<?> getPostUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Not found User");
        
        String yourname = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<ArticleResMin> posts = user.get().getPosts().stream()
            .map(articleRepository::findByArticleId)
            .map(o ->{
                if (!o.isPresent())
                    return null;
                else return o.get();
            })
            .map(a -> articleMapper.toArticleResMin(a, yourname))
            .toList();
        
        return ResponseEntity.ok(posts);
    }

    @Transactional
    public ResponseEntity<?> getCommentUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Not found User");
        
        List<CommentResMin> posts = user.get().getComments().stream()
            .map(commentRepository::findByCommentId)
            .map(o ->{
                if (!o.isPresent())
                    return null;
                else return o.get();
            })
            .map(commentMapper::toCommentResMin)
            .toList();
        
        return ResponseEntity.ok(posts);
    }

    @Transactional
    public ResponseEntity<?> getRepostUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Not found User");
        
        String yourname = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<ArticleResMin> posts = user.get().getPostReposts().stream()
            .map(articleRepository::findByArticleId)
            .map(o ->{
                if (!o.isPresent())
                    return null;
                else return o.get();
            })
            .map(a -> articleMapper.toArticleResMin(a, yourname))
            .toList();
        
        return ResponseEntity.ok(posts);
    }

    @Transactional
    public ResponseEntity<?> getActive() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

        List<Article> res = new ArrayList<>();

        user.getPosts().stream()
            .map(articleRepository::findByArticleId)
            .map(Optional::get)
            .forEach(res::add);
        user.getPostLikes().stream()
            .filter(id -> {
                return !res.stream().map(Article::getArticleId).toList().contains(id);
            })
            .map(articleRepository::findByArticleId)
            .map(Optional::get)
            .forEach(res::add);
        user.getPostSaves().stream()
            .filter(id -> {
                return !res.stream().map(Article::getArticleId).toList().contains(id);
            })
            .map(articleRepository::findByArticleId)
            .map(Optional::get)
            .forEach(res::add);
        user.getPostReposts().stream()
            .filter(id -> {
                return !res.stream().map(Article::getArticleId).toList().contains(id);
            })
            .map(articleRepository::findByArticleId)
            .map(Optional::get)
            .forEach(res::add);
        String yourname = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return ResponseEntity.ok(
            res.stream().map(a -> articleMapper.toArticleResMin(a, yourname)).toList()
        );
    }

    public ResponseEntity<?> get(
        String username
    ){
        Optional<User> user = userRepository.findByUsername(username);
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(
            userMapper.toUserAuthRes(user.get())
        );
    }

    public ResponseEntity<?> follow(String username) {
        Optional<User> you;
        Optional<User> user = userRepository.findByUsername(username);
        if (SecurityContextHolder.getContext().getAuthentication() != null)
            you = userRepository.findByUsername(
                SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()
            );
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        if (!user.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        if (!user.get().getFollowers().contains(you.get().getUsername())){
            user.get().addFollower(you.get().getUsername());
            you.get().addFollow(username);
        } else{
            user.get().removeFollower(you.get().getUsername());
            you.get().removeFollow(username);
        }
        User save = userRepository.save(user.get());
        userRepository.save(you.get());

        return ResponseEntity.ok(userMapper.toUserAuthRes(save));
    }

    public ResponseEntity<?> update(UserRequest request){
        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (!user.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        user.get().setUsername(request.getUsername());
        if (request.getAvatar() != "")
        user.get().setAvatar(request.getAvatar());
        user.get().setFullname(request.getFullname());
        user.get().setTitle(request.getTitle());

        return ResponseEntity.ok(
            userMapper.toUserAuthRes(userRepository.save(user.get()))
        );
    }
}
