package com.nmtruong.add.dto.comment.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CommentResMin extends CommentResponse{
    
    private int likes;
    private int comments;
    
}
