package com.hss.movieboard.web;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hss.movieboard.domain.dto.Movie;
import com.hss.movieboard.service.AmazonS3Service;
import com.hss.movieboard.service.MovieService;

import lombok.RequiredArgsConstructor;

//security 라이브러리를 적용하면 CORS정책을 가지고있어서 security 단에서 CORS를 해제해주면 된다.
@CrossOrigin		// CORS 정책으로 인한 외부 자바스크립트 요청 제한을 해제하는 어노테이션.
@RestController
@RequiredArgsConstructor
public class MovieController {
	
	private final MovieService movieService;
	private final AmazonS3Service amazonS3Service;
	
	// 이미지 없이 영화정보 등록
	@PostMapping("/manager/movie")
	public ResponseEntity<?> save(@RequestPart("movie") Movie movie){
		
		String basicImgUrl = amazonS3Service.getBasicImgUrl();
		movie.setPhoto(basicImgUrl);
		return new ResponseEntity<>(movieService.saveMovie(movie), HttpStatus.CREATED); //200
	}
	
	// 이미지 포함 영화정보 등록
	@PostMapping("/manager/movieplus")
	public ResponseEntity<?> saveWithPhoto(@RequestPart("movie") Movie movie, @RequestPart("file")MultipartFile file) throws IllegalStateException, IOException{
		
		if(file != null) {		
			//1. AWS S3에 파일 저장
			String UploadedimgUrl = amazonS3Service.uploadImg(file, "static");
			//2. 파일명 초기화
			movie.setPhoto(UploadedimgUrl);
		}
		//3. Movie 정보 DB에 저장
		return new ResponseEntity<>(movieService.saveMovie(movie), HttpStatus.CREATED); //200
	}
	
	// 전체 영화목록 추출
	@GetMapping("/movie")
	public ResponseEntity<?> findAll(){
		// ResponseEntity타입은 http status 코드도 함께 보낼 수 있어서 쓰임
		return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK); //200
	}
	
	// 영화 디테일 추출
	@GetMapping("/movie/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id){
		return new ResponseEntity<>(movieService.getMovie(id), HttpStatus.OK); //200
	}
	
	// 이미지 없이 영화정보 수정
	@PutMapping("/manager/movie/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestPart("movie") Movie movie){
		return new ResponseEntity<>(movieService.modifyMovie(id, movie), HttpStatus.OK); //200
	}
	
	// 이미지 포함 영화정보 수정
	@PutMapping("/manager/movieplus/{id}")
	public ResponseEntity<?> updateWithPhoto(@PathVariable Long id, @RequestPart("movie") Movie movie, @RequestPart("file")MultipartFile file) throws IllegalStateException, IOException{
		
		if(file != null) {		
			//1. AWS S3에 파일 저장
			String UploadedimgUrl = amazonS3Service.uploadImg(file, "static");
			//2. AWS S3에 기존 포토 삭제
			amazonS3Service.deleteImg(id);
			//3. 파일명 초기화
			movie.setPhoto(UploadedimgUrl);
			
		}
		// 4. 영화정보 수정
		return new ResponseEntity<>(movieService.modifyMovie(id, movie), HttpStatus.OK); //200
	}
	
	@DeleteMapping("/manager/movie/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		// 1. AWS S3에 기존 포토 삭제
		amazonS3Service.deleteImg(id);
		// 2. DB에서 영화정보 삭제
		return new ResponseEntity<>(movieService.deleteMovie(id), HttpStatus.OK); //200
		
		
	}
}
