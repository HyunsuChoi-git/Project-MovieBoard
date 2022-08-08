package com.hss.movieboard.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.service.UsersService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UsersController {
	
	private final UsersService usersService;
	
	@GetMapping("/admin/user")	// 전체 회원조회
	public ResponseEntity<?> getAllUsers(){

		return new ResponseEntity<>(usersService.getAllUsers(), HttpStatus.OK); //200
	}
	

	@PostMapping("/user/{email}")	 	// 회원정보 가져오기
	public ResponseEntity<?> getUser(@PathVariable String email ){
		System.out.println("유저정보 : "+ email);
		return new ResponseEntity<>(usersService.getUser(email), HttpStatus.OK);
	}
	
	@PutMapping("/user/{email}")	// 회원정보 수정하기
	public ResponseEntity<?> updateUser(@PathVariable String email, @RequestPart("user") Users user){
		System.out.println(email);

		return new ResponseEntity<>(usersService.updateUser(user, email), HttpStatus.OK);

	}
	
	@DeleteMapping("/user/{email}")	//회원삭제
	public ResponseEntity<?> deleteUser(@PathVariable String email){

		return new ResponseEntity<>(usersService.deleteUser(email), HttpStatus.OK); //200
	}
	
	@PostMapping("/role")	// 권한정보 가져오기
	public ResponseEntity<?> getRole(@RequestBody Users user) {

		return  new ResponseEntity<>(usersService.getRole(user.getEmail()), HttpStatus.OK);
	}	
	
	@PostMapping("/join")	//회원가입
	public ResponseEntity<?> saveUser(@RequestPart("user") Users user) {
		
		usersService.saveUser(user);
		return  new ResponseEntity<>("ok", HttpStatus.OK);
	}
	

}
