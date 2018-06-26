package org.alpo.eample.blog.service;

import org.alpo.eample.blog.entity.Post;
import org.alpo.eample.blog.repos.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepo postRepo;

    @Autowired
    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    public List<Post> getAllPost() {
        return postRepo.findAll();
    }

    public void insert(Post post) {
        postRepo.save(post);
    }
}
