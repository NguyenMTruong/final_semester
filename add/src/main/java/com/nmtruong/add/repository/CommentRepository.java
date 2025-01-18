package com.nmtruong.add.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nmtruong.add.entity.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String>{
    Optional<Comment> findByCommentId(String id);
    void deleteByCommentId(String id);
}
