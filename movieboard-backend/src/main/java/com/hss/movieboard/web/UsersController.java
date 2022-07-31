package com.hss.movieboard.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
	public ResponseEntity<?> findAll(){
		return new ResponseEntity<>(usersService.getAllUsers(), HttpStatus.OK); //200
	}
	
	@PostMapping("/login")	// 로그인 체크
	public ResponseEntity<?> CheckLogin(String email, String pw ) {
		
		usersService.checkLogin(email, pw);
		
		return  new ResponseEntity<>("ok", HttpStatus.OK);
	}
	
	
	@PostMapping("/join")	//회원가입
	public ResponseEntity<?> SaveUSer(@RequestPart("user")  Users user) {
		System.out.println("controllr : "+ user);
		usersService.saveUser(user);
		
		return  new ResponseEntity<>("ok", HttpStatus.OK);
	}
}
