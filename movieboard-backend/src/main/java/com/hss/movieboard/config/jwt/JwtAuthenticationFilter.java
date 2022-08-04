package com.hss.movieboard.config.jwt;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

//스프링시큐리티에 있는 UsernamePasswordAuthenticationFilter를 상속받기
// /login 요청해서 username, password를 post로 전송하면
// 이 필터가 동작
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private final AuthenticationManager authenticationManager;
	
	// '/login' 로 로그인 시도시 실행되는 함수
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter 로그인 시도");
		
		//1. username, password 받아서 정상여부 체크
		//   authenticationManager로 로그인을 시도하면 PrincipalDetailsService가 호출됨 --> 내부의 loadUserByUsername 함수가 실행됨.
		
		//2. PrincipalDetails 가 리턴이되면 세션에 담고  --> 권한체크를 위해 세션을 만든다.
		
		//3. JWT를 만들어 응답해주면 됨.
		
		
		
		
		return super.attemptAuthentication(request, response);
	}
	
}
