package com.hss.movieboard.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.hss.movieboard.domain.Users;
import com.hss.movieboard.service.MovieService;
import com.hss.movieboard.service.UsersService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class UsersController {
	
	private final UsersService usersService;
	
	@GetMapping("/user")	// 회원조회
	public ResponseEntity<?> getAllUsers(){
		return new ResponseEntity<>(usersService.getAllUsers(), HttpStatus.OK); //200
	}
	
	@PostMapping("/login")	// 로그인 체크
	public ResponseEntity<?> checkLogin(String email, String pw ) {
		
		usersService.checkLogin(email, pw);
		
		return  new ResponseEntity<>("ok", HttpStatus.OK);
	}	
	
	@PostMapping("/user")	//회원가입
	public ResponseEntity<?> saveUser(@RequestPart("user") Users user) {

		usersService.saveUser(user);
		return  new ResponseEntity<>("ok", HttpStatus.OK);
	}
	
	@DeleteMapping("/user/{email}")	//회원삭제
	public ResponseEntity<?> deleteUser(@PathVariable String email){
		return new ResponseEntity<>(usersService.deleteUser(email), HttpStatus.OK); //200
		
	}
}
