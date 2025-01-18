package com.nmtruong.add.dto.article.response;

import java.util.List;

import com.nmtruong.add.dto.comment.response.CommentResMin;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleResComment extends ArticleResponse{
    private int likes;
    private int shares;
    private int reposts;
    private List<CommentResMin> comments;
    
    private boolean like;
    private boolean repost;
}
