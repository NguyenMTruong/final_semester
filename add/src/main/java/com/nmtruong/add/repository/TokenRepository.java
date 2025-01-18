package com.nmtruong.add.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nmtruong.add.entity.Token;

@Repository
public interface TokenRepository extends MongoRepository<Token, String>{
    List<Token> findAllByUsername(String username);
    Optional<Token> findByAccessToken(String token);
    Optional<Token> findByRefreshToken(String token);
    void deleteByTokenId(String id);
}
