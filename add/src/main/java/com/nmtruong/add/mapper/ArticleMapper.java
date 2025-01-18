package com.nmtruong.add.mapper;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.dto.article.response.ArticleResComment;
import com.nmtruong.add.dto.article.response.ArticleResMin;
import com.nmtruong.add.entity.Article;
import com.nmtruong.add.entity.User;
import com.nmtruong.add.repository.CommentRepository;
import com.nmtruong.add.repository.UserRepository;

@Component
public class ArticleMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private CommentRepository commentRepository;
    
    @Transactional
    public ArticleResMin toArticleResMin(Article article, String username) {
        ArticleResMin res = new ArticleResMin();

        User user = userRepository.findByUsername(article.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("Notfound"));
        res.setId(article.getArticleId());
        res.setUser(userMapper.toUserAuthRes(user));
        res.setContent(article.getContent());
        res.setImages(article.getImages());
        res.setCreateAt(article.getCreateAt());

        res.setLikes(article.getLikes().size());
        res.setShares(article.getShares().size());
        res.setReposts(article.getReposts().size());

        res.setComments(article.getComments().size());

        if (username != ""){
            res.setLike(article.getLikes().contains(username));
            res.setRepost(article.getReposts().contains(username));
        }else if(SecurityContextHolder.getContext().getAuthentication() != null){
            res.setLike(article.getLikes().contains(
                SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal().toString()
            ));
            
            res.setRepost(article.getReposts().contains(
                SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getPrincipal().toString()
            ));
        }
        else {
            res.setLike(false);
            res.setRepost(false);
        }
        return res;
    }

    public ArticleResComment toArticleResComment(Article article) {
        ArticleResComment res = new ArticleResComment();
        User user = userRepository.findByUsername(article.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("Notfound"));
        res.setId(article.getArticleId());
        res.setUser(userMapper.toUserAuthRes(user));
        res.setContent(article.getContent());
        res.setImages(article.getImages());
        res.setCreateAt(article.getCreateAt());

        res.setLikes(article.getLikes().size());
        res.setShares(article.getShares().size());
        res.setReposts(article.getReposts().size());

        res.setComments(
            article.getComments().stream()
                .map(commentRepository::findByCommentId)
                .map(Optional::get)
                .map(commentMapper::toCommentResMin)
                .toList()
        );

        res.setLike(article.getLikes().contains(
            SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal().toString()
        ));
        res.setRepost(article.getLikes().contains(
            SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal().toString()
        ));
        return res;
    }

}
