package com.nmtruong.add.mapper;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.nmtruong.add.dto.User.response.UserAuthRes;
import com.nmtruong.add.entity.User;

@Component
public class UserMapper {

    @Transactional
    public UserAuthRes toUserAuthRes(User user) {
        UserAuthRes res = new UserAuthRes();
        res.setUsername(user.getUsername());
        if(user.getAvatar() == null)
            res.setAvatar("");
        else res.setAvatar(user.getAvatar());
        res.setFullname(user.getFullname());
        if (user.getTitle() == null)
            res.setTitle("");
        else res.setTitle(user.getTitle());
        res.setFollows(user.getFollowers().size());
        if (SecurityContextHolder.getContext().getAuthentication() != null)
            res.setFollow(user.getFollowers().contains(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        else res.setFollow(false);
        return res;
    }

}
