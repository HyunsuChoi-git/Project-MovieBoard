package com.hss.movieboard.config.jwt;

import java.io.IOException;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hss.movieboard.config.auth.PrincipalDetails;
import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.domain.type.JwtProperties;

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
		
		try {
			// steam에 있는 로그인 정보 원시적으로 꺼내보기
//			BufferedReader br = request.getReader();
//			String input = null;
//			while((input = br.readLine())!=null) {
//				System.out.println(input); 
//			}
			//결과 :  email=choihs1054%40gmail.com&pw=1234
			
			
			//1. username, password 받아서 정상여부 체크
			// 	1) 로그인 정보 파싱해주기
			ObjectMapper om = new ObjectMapper();
			Users user = om.readValue(request.getInputStream(), Users.class);
			
			// 	2) 토큰 만들기
			UsernamePasswordAuthenticationToken authenticationToken =
					new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPw());

			// 	3) PrincipalDetailsService 의 loadUserByUsername()를 실행하며 로그인 시도를 하는 것. 
			//      -> 정상 로그인 : 내 로그인 정보가 authentication에 담김
			Authentication authentication = 
					authenticationManager.authenticate(authenticationToken);
			
			//  PrincipalDetails에 담아 authentication 꺼내보기 => 로그인 되었다.
			PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
			System.out.println("- 로그인 인증 완료 : "+principalDetails.getUser().getEmail());
			
			//2. authentication 객체를 리턴하여 정상적으로 session영역에 저장됨
						// 리턴 이유 : Session을 만들기 위해
						// Session을 굳이 만드는 이유 : 권한 관리를 위해.
						// Session이 필요없으면 굳이 return을 하지 않아도 됨.
			return authentication;
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	// 위에서 attemptAuthentication 실행 후 인증이 정상적으로 완료되면, successfulAuthentication 함수가 실행됨.
	// JWT 토큰을 만들어서 request요청한 사용자에게 JWT토큰을 response 해주면 됨
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		
		PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
		
		// 3. 토큰 만들기 (HMAC암호화 방식)
		String jwtToken = JWT.create()
				.withSubject(principalDetails.getUsername()) //토큰명
				.withExpiresAt(new Date(System.currentTimeMillis()+(60000*10))) //토큰 만료시간 (10분)
				.withClaim("email", principalDetails.getUser().getEmail()) //	비공개키. 원하는 정보 여러개 넣을 수 있다.
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
		

		//	4. JWT토큰 Response
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
		
		System.out.println("- JWT토큰 Response 완료");
	}
	

	
}
