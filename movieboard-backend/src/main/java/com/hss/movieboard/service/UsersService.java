package com.hss.movieboard.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.hss.movieboard.domain.Users;
import com.hss.movieboard.domain.UsersRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {
	
	private final UsersRepository usersRepository;
	
	@Transactional // 회원가입
	public String saveUser(Users user) {
		usersRepository.save(user);
		
		return user.getEmail();
	}
	
	@Transactional	// 로그인체크
	public String checkLogin(String email, String pw) {

		Users userEntity = usersRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("아이디와 패스워드를 확인하세요."));
		
		return "ok";
    
	}
	
	@Transactional	// 회원정보 수정
	public Users updateUser(Users user, String email) {
		Users userEntity = usersRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일을 확인하세요."));
		userEntity.setPw(user.getPw());
		
		
		return userEntity;
	}
	
	@Transactional	// 회원정보 삭제
	public String deleteUser(String email) {
		
		usersRepository.deleteById(email);
		
		return "ok";
	}
	
	
	@Transactional	// 회원정보 가져오기
	public List<Users> getAllUsers() {

		return usersRepository.findAll();
	}

}
