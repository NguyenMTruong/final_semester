package com.nmtruong.add.dto.article.request;

import java.util.List;

import lombok.Data;

@Data
public class ArticleRequest {
    private String articleId;
    private String username;

    private String content;
    private List<String> images;
}
