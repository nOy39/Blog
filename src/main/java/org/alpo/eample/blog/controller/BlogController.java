package org.alpo.eample.blog.controller;

import org.alpo.eample.blog.entity.Post;
import org.alpo.eample.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "blog")
public class BlogController {

    private final PostService postService;

    @Autowired
    public BlogController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(value = "/bears")
    public List<Post> posts() {
        List<Post> messages = postService.getAllPost();
        return postService.getAllPost();
    }

    @PostMapping(value = "/bears")
    public void publishPost(@RequestBody Post post) {
        if (post.getDate() == null) {
            post.setDate(LocalDate.now());
        }
        postService.insert(post);
    }

}
