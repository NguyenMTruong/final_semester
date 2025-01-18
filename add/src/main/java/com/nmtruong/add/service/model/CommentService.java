package com.nmtruong.add.service.model;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nmtruong.add.dto.comment.request.CommentRequest;
import com.nmtruong.add.entity.Article;
import com.nmtruong.add.entity.Comment;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.mapper.CommentMapper;
import com.nmtruong.add.repository.ArticleRepository;
import com.nmtruong.add.repository.CommentRepository;
import com.nmtruong.add.repository.UserRepository;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ArticleRepository articleRepository;

    public ResponseEntity<?> create(CommentRequest request){
        Comment comment = new Comment();
        comment.setUsername(request.getUsername());
        comment.setPostId(request.getPostId());
        comment.setParentId(request.getParentId());

        comment.setContent(request.getContent());
        comment.setImages(request.getImages());

        comment.setLikes(new ArrayList<>());
        comment.setReplies(new ArrayList<>());

        
        Comment save = commentRepository.save(comment);
        
        
        User user =
            userRepository.findByUsername(
                save.getUsername()
            ).orElseThrow(() -> new UsernameNotFoundException("Not found"));

        user.addComment(save.getCommentId());
        userRepository.save(user);
        if (save.getParentId() == null) {
            Article post = articleRepository.findByArticleId(save.getPostId())
            .orElseThrow(() -> new UsernameNotFoundException("Not found Post"));
            post.addComment(save.getCommentId());
            articleRepository.save(post);
        } else {
            Comment parent = commentRepository.findByCommentId(save.getParentId())
                .orElseThrow(() -> new UsernameNotFoundException("Not found comment"));
            parent.addReply(save.getCommentId());
            commentRepository.save(parent);
        }
        
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> get(String commentId){
        Optional<Comment> comment = commentRepository.findByCommentId(commentId);
        if (!comment.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        
        return ResponseEntity.ok(commentMapper.toCommentResAll(comment.get()));
    }

    public ResponseEntity<?> likeComment(String commentId) {
        Optional<User> you = userRepository.findByUsername(
            SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()
        );
        Optional<Comment> comment = commentRepository.findByCommentId(commentId);

        if (!comment.isPresent())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found comment");
        
        comment.get().addLike(you.get().getUsername());
        commentRepository.save(comment.get());
        you.get().addCommentLike(commentId);
        userRepository.save(you.get());

        return ResponseEntity.ok().build();
    }

}
