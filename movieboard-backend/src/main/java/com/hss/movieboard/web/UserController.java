package com.hss.movieboard.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hss.movieboard.service.MovieService;
import com.hss.movieboard.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RequiredArgsConstructor
@RestController
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> CheckLogin(String email, String pw ) {
		
		userService.checkLogin(email, pw);
		
		return  new ResponseEntity<>("ok", HttpStatus.OK);
		
	}
}
