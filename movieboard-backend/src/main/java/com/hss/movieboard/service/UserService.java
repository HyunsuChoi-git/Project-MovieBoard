package com.hss.movieboard.service;


import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.hss.movieboard.domain.Movie;
import com.hss.movieboard.domain.User;
import com.hss.movieboard.domain.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	
	private final UserRepository userRepository;
	
	@Transactional
	public String saveUser(User user) {
		
		return user.getEmail();
	}
	
	@Transactional
	public String checkLogin(String email, String id) {
		
		
		
		return "ok";
	}
	
	@Transactional
	public User updateUser(User user, String email) {
		User userEntity = userRepository.findById(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일을 확인하세요"));
		userEntity.setPw(user.getPw());
		
		
		
		
		return userEntity;
	}
	
	@Transactional
	public String deleteUser(String email) {
		
		userRepository.deleteById(email);
		
		return "ok";
	}

}
