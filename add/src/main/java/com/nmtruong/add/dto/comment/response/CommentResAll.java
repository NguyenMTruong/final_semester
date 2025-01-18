package com.nmtruong.add.dto.comment.response;

import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CommentResAll extends CommentResponse{
    
    private int likes;
    private List<CommentResMin> comments;
    
}
