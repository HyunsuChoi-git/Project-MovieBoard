package com.hss.movieboard.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.hss.movieboard.domain.UsersRepository;
import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.domain.type.RoleLevel;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {
	
	private final UsersRepository usersRepository;
	
	@Transactional // 회원가입
	public String saveUser(Users user) {
		
		Users userEntity = Users.builder()
				.email(user.getEmail())
				.pw(user.getPw())
				.gender(user.getGender())
				.birth(user.getBirth())
				.roles(RoleLevel.ROLE_USER)
				.build();
		
		usersRepository.save(user);
		
		return user.getEmail();
	}
	
	@Transactional	// 로그인체크
	public String checkLogin(String email, String pw) {
		System.out.println(" - 로그인 체크");

		Users userEntity = usersRepository.findById(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일과 패스워드를 확인하세요."));
		
		if(userEntity.getPw() != pw) {
			new IllegalArgumentException("이메일과 패스워드를 확인하세요.");
		}
		
		return "ok";
	}
	
	@Transactional	// 회원정보 수정
	public Users updateUser(Users user, String email) {
		Users userEntity = usersRepository.findById(email)
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
