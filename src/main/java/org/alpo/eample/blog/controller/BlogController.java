package org.alpo.eample.blog.controller;

import org.alpo.eample.blog.entity.Post;
import org.alpo.eample.blog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class BlogController {

    private final PostService postService;

    @Autowired
    public BlogController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(value = "/")
    public String index() {
        return "index";
    }

    @GetMapping(value = "/posts")
    public List<Post> posts() {
        return postService.getAllPost();
    }

    @PostMapping(value = "/post")
    public void publishPost(@RequestBody Post post) {
        if (post.getDate() == null) {
            post.setDate(LocalDate.now());
        }
        postService.insert(post);
    }
}
