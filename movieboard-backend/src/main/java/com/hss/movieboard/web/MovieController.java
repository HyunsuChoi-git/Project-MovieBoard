package com.hss.movieboard.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hss.movieboard.domain.Movie;
import com.hss.movieboard.service.MovieService;

import lombok.RequiredArgsConstructor;

//security 라이브러리를 적용하면 CORS정책을 가지고있어서 security 단에서 CORS를 해제해주면 된다.
@CrossOrigin		// CORS 정책으로 인한 외부 자바스크립트 요청 제한을 해제하는 어노테이션.
@RestController
@RequiredArgsConstructor
public class MovieController {
	
	private final MovieService movieService;
	
	@CrossOrigin
	@PostMapping("/movie")
	public ResponseEntity<?> save(@RequestBody Movie movie){
		return new ResponseEntity<>(movieService.saveMovie(movie), HttpStatus.CREATED); //200
	}
	
	
	@GetMapping("/movie")
	public ResponseEntity<?> findAll(){
		// ResponseEntity타입은 http status 코드도 함께 보낼 수 있어서 쓰임
		return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK); //200
	}
	
	@GetMapping("/movie/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id){
		return new ResponseEntity<>(movieService.getMovie(id), HttpStatus.OK); //200
	}
	
	@PutMapping("/movie/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Movie movie){
		return new ResponseEntity<>(movieService.modifyMovie(id, movie), HttpStatus.OK); //200
	}
	
	@DeleteMapping("/movie/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		return new ResponseEntity<>(movieService.deleteMovie(id), HttpStatus.OK); //200
		
		
	}
}
