package com.hss.movieboard.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hss.movieboard.domain.UsersRepository;
import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.domain.type.RoleLevel;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UsersService {
	
	private final UsersRepository usersRepository;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Transactional // 회원가입
	public String saveUser(Users user) {
		
		Users userEntity = Users.builder()
				.email(user.getEmail())
				.pw(bCryptPasswordEncoder.encode(user.getPw())) // 패스워드 암호화
				.gender(user.getGender())
				.birth(user.getBirth())
				.roles(RoleLevel.ROLE_USER)
				.build();
		
		usersRepository.save(userEntity);
		
		return user.getEmail();
	}
	
//	@Transactional	// 로그인체크
//	public String checkLogin(String email, String pw) {
//
//		Users userEntity = usersRepository.findById(email)
//				.orElseThrow(() -> new IllegalArgumentException("이메일과 패스워드를 확인하세요."));
//		
//		if(userEntity.getPw() != pw) {
//			new IllegalArgumentException("이메일과 패스워드를 확인하세요.");
//		}
//		
//		return "ok";
//	}
	
	@Transactional	// 회원정보 수정
	public Users updateUser(Users user, String email) {
		
		System.out.println(user);
		System.out.println(email);
		
		Users userEntity = usersRepository.findById(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일을 확인하세요."));
		userEntity.setPw(bCryptPasswordEncoder.encode(user.getPw()));
		userEntity.setBirth(user.getBirth());
		userEntity.setGender(user.getGender());
		
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
	
	@Transactional	// 회원 권한 가져오기
	public Object getRole(String email) {

		return usersRepository.findById(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일과 패스워드를 확인하세요."))
				.getRoles();
	}

	public Object getUser(String email) {

		return usersRepository.findById(email)
				.orElseThrow(() -> new IllegalArgumentException("이메일을 확인하세요."));
	}

}
