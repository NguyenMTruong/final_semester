package com.nmtruong.add.dto.article.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ArticleResMin extends ArticleResponse{
    
    private int likes;
    private int shares;
    private int reposts;
    private int comments;
    
    private boolean like;
    private boolean repost;
}
