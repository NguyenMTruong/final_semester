package com.nmtruong.add.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nmtruong.add.entity.Article;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {
    List<Article> findAll();
    Optional<Article> findByArticleId(String id);
    void deleteByArticleId(String id);
}
