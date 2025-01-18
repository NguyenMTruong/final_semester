package com.nmtruong.add.mapper;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.dto.comment.response.CommentResAll;
import com.nmtruong.add.dto.comment.response.CommentResMin;
import com.nmtruong.add.entity.Comment;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.repository.CommentRepository;
import com.nmtruong.add.repository.UserRepository;

@Component
public class CommentMapper {
    
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public CommentResMin toCommentResMin(Comment comment) {
        CommentResMin res = new CommentResMin();

        Optional<User> user = userRepository.findByUsername(comment.getUsername());
        res.setUser(userMapper.toUserAuthRes(user.get()));

        res.setId(comment.getCommentId());
        res.setPostId(comment.getPostId());
        res.setParentId(comment.getParentId());

        res.setContent(comment.getContent());
        res.setImages(comment.getImages());

        res.setLikes(comment.getLikes().size());
        res.setComments(comment.getReplies().size());

        res.setLike(
            user.get().getCommentLikes().contains(
                comment.getCommentId()
            )
        );
        
        return res;
    }    

    @Transactional
    public CommentResAll toCommentResAll(Comment comment) {
        CommentResAll res = new CommentResAll();

        Optional<User> user = userRepository.findByUsername(comment.getUsername());
        res.setUser(userMapper.toUserAuthRes(user.get()));

        res.setId(comment.getCommentId());
        res.setPostId(comment.getPostId());
        res.setParentId(comment.getParentId());

        res.setContent(comment.getContent());
        res.setImages(comment.getImages());

        res.setLikes(comment.getLikes().size());
        res.setComments(
            comment.getReplies().stream()
                .map(commentRepository::findByCommentId)
                .map(Optional::get)
                .map(this::toCommentResMin)
                .toList()
        );        

        res.setLike(
            user.get().getCommentLikes().contains(
                comment.getCommentId()
            )
        );
        
        return res;
    }    

}
