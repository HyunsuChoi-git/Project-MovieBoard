package com.hss.movieboard.config.jwt;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.hss.movieboard.config.auth.PrincipalDetails;
import com.hss.movieboard.domain.UsersRepository;
import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.domain.type.JwtProperties;

// 시큐리티가 filter를 가지고 있는데 그 필터 중에 BasicAuthenticationFilter라는 것이 있음
// 권한이나 인증이 필요한 특정 주소를 요청해쓸 때 위 필터를 무조건 타게 되어있음

public class JwtAuthorizationFilter extends BasicAuthenticationFilter{
	
	private UsersRepository usersRepository;
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UsersRepository usersRepository) {
		super(authenticationManager);
		this.usersRepository = usersRepository;
		
	
	}
	
	//권한이나 권한이 필요한 요청이 있을 때 이 필터를 타게됨
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		// TODO Auto-generated method stub

		System.out.println("- 인증이나 권한이 필요한 주소 요청");
		// 1. Header에서 Authorization 값(jwt토큰) 추출 
		String jwtHeader = request.getHeader(JwtProperties.HEADER_STRING);
		
		if(jwtHeader == null) {
			chain.doFilter(request, response);
			return;
		}
		// 2. JWT 토큰 검증 (우리가 만든 토큰인지 아닌지)
			// 토큰유무, 우리가 토큰 만들 때 토큰 앞에 붙힌 값 체크
		if(!jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
			System.out.println("- 토큰 인증오류 " + jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX));
			chain.doFilter(request, response);
			return;
		}

		String jwtToken = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");
		String email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build()
				.verify(jwtToken)	// 서명하기
				.getClaim("email")	// 서명정상적으로 되면 우리가 개인키로 넣었던 claim 가져오기
				.asString();
		System.out.println("- 요청 email : "+ email);
		if(email != null) {
			//email이 정상적으로 들어오면 OK.
			Optional<Users> userEntity = usersRepository.findById(email);
			
			PrincipalDetails principalDetails = new PrincipalDetails(userEntity.get());
			
			//Authentication 객체를 생성해준다.
			Authentication authentication = new UsernamePasswordAuthenticationToken(
					principalDetails, null, principalDetails.getAuthorities() );
			
			//강제로 시큐리티의 세션에 접근하여 Authentication객체를 저장.
			SecurityContextHolder.getContext().setAuthentication(authentication);

		}
		
		chain.doFilter(request, response);
	}
}
