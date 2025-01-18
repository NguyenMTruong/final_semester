package com.nmtruong.add.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class Test {

    private final String UPLOAD_DIR = "upload/";
    
    @PostMapping(value = {"/test"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> test(
        @RequestParam("username") String username,
        @RequestParam("content") String content,
        @Validated @RequestParam("files") MultipartFile[] images
    ){
        try {
        List<String> res = new ArrayList<>();

        int count = 0;
        for (MultipartFile file : images) {
            String fileName = UUID.randomUUID()+"_"+count+file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            String fileUrl = "http://localhost:8283/images/" + fileName;
            res.add(fileUrl);
            count++;
        }
        return ResponseEntity.ok(res);
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error uploading files: " + e.getMessage());
    }
    }

    @GetMapping("/images/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Trả về file kèm theo header để trình duyệt nhận diện kiểu nội dung
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
