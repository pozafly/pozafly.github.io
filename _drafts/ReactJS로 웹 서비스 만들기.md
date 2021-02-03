```
public void update(String title, String content) {
    this.title = title;
    this.content = content;
}
```

```
@Transactional
public Long update(Long id, PostsUpdateRequestDto requestDto) {
    Posts posts = postsRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));

    posts.update(requestDto.getTitle(), requestDto.getContent());

    return id;
}

public PostsResponseDto findById(Long id) {
    Posts entity = postsRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));

    return new PostsResponseDto(entity);
}
```

