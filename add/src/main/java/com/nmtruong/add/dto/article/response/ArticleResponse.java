package com.nmtruong.add.dto.article.response;

import java.time.LocalDate;
import java.util.List;

import com.nmtruong.add.dto.User.response.UserAuthRes;

import lombok.Data;

@Data
public class ArticleResponse {
    private String id;
    private UserAuthRes user;

    private String content;
    private List<String> images;

    private LocalDate createAt;

}
