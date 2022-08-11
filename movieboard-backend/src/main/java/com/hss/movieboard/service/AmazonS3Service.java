package com.hss.movieboard.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.hss.movieboard.domain.MovieRepository;
import com.hss.movieboard.domain.dto.Movie;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class AmazonS3Service {
	
	private final MovieRepository movieRepository;
	private final AmazonS3Client amazonS3Client;
	private final String basicImgFilename = "/static/basic.png";

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷 이름
    
    // 이미지파일 s3에 업로드
    public String uploadImg(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));

        return upload(uploadFile, dirName);
    }
    
    // 이미지파일 주소 가져오기
    public String getBasicImgUrl() {
    	URL bucketUrl = amazonS3Client.getUrl(bucket, "/static/basic.png");
    	String basicImgUrl = bucketUrl.getProtocol()+"://"+bucketUrl.getHost()+basicImgFilename;
    	System.out.println(basicImgUrl);
        return basicImgUrl;
    }

    // 이미지파일 삭제하기
    public void deleteImg(Long id){
    	// 1. DB에서 삭제할 이미지 주소 추출
    	Movie movie = movieRepository.findById(id).get();
		String fileName = movie.getPhoto();
		// 기본이미지일 경우 삭제X
		if(fileName.contains(basicImgFilename)) return;
    	
		// 2. aws s3에서 이미지 삭제
        DeleteObjectRequest deleteFile = new DeleteObjectRequest(bucket, fileName);
        amazonS3Client.deleteObject(deleteFile);
    }
    
    
    
/////////////////////////////////////////////////// S3업로드 Function ///////////////////////////////////////////////////
    // S3로 파일 업로드하기
    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름 
        System.out.println("- 파일명 : "+fileName);
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {    	
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        
        if (convertFile.isFile()) {
        	convertFile.delete();
        }
        
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        
        return Optional.empty();
    }
    
	
}
