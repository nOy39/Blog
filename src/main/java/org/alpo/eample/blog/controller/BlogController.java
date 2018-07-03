package org.alpo.eample.blog.controller;

import org.alpo.eample.blog.entity.Post;
import org.alpo.eample.blog.repos.PostRepo;
import org.alpo.eample.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "blog")
public class BlogController {

    private final PostService postService;
    private final PostRepo postRepo;

    @Autowired
    public BlogController(PostService postService,
                          PostRepo postRepo) {
        this.postService = postService;
        this.postRepo = postRepo;
    }

    @GetMapping(value = "/bears")
    public List<Post> posts() {
        List<Post> messages = postService.getAllPost();
        return postService.getAllPost();
    }

    @PostMapping(value = "/bears")
    public Post publishPost(@RequestBody Post post) {
        if (post.getDate() == null) {
            post.setDate(LocalDate.now());
        }
        postService.insert(post);

        return postRepo.save(post);
    }

    @PutMapping("{id}")
    public Post update(@RequestBody Post post) {
//        Post oldPost = postRepo.findById(post.getId()).get();
//        oldPost.setBody(post.getBody());
//        oldPost.setTitle(post.getTitle());
//        oldPost.setDate(post.getDate());
        return postRepo.save(post);
    }

}
