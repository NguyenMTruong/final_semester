package com.nmtruong.add.service.global;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class UploadFile {
    
    private final static String UPLOAD_DIR = "upload/";
    
    public static List<String> upload(MultipartFile[] files) {
        List<String> images = new ArrayList<>();
        try {
            int count = 0;
            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID()+"_"+count+"_"+file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                String fileUrl = "http://localhost:8283/images/" + fileName;
                images.add(fileUrl);
                count++;
            }
        } catch (Exception e) {
            return null;
        }
        return images;
    }
}
