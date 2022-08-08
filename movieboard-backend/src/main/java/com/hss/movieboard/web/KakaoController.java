package com.hss.movieboard.web;

import java.net.http.HttpResponse;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.HttpResource;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.hss.movieboard.domain.dto.Users;
import com.hss.movieboard.domain.type.JwtProperties;
import com.hss.movieboard.service.KakaoService;
import com.hss.movieboard.service.UsersService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class KakaoController {
	
	private final KakaoService kakaoService;
	private final UsersService usersService;
	
	
	@GetMapping("/kakao/*")
	public void getAccessToken(@RequestParam String code, @RequestParam String client_id, @RequestParam String redirect_uri) {
		System.out.println("code : "+ code);
		System.out.println("client_id : "+client_id);
		System.out.println("redirect_uri : "+redirect_uri);
		
		kakaoService.getAccessToken(code, client_id, redirect_uri);
	}
	
	
	@GetMapping("/kakaotoken/*")
	public ResponseEntity<?> getUserInfo(@RequestParam String access_token, @RequestParam String client_id, @RequestParam String redirect_uri, HttpServletResponse response) {
		System.out.println("access_token : "+ access_token);
		System.out.println("client_id : "+client_id);
		System.out.println("redirect_uri : "+redirect_uri);
		
		
		Users kakaoUser = kakaoService.createKakaoUser(access_token);
		Users userEntity = usersService.checkUser(kakaoUser.getEmail());
		
		// 회원인 경우에는 200, 비회원인 경우에는 202 리턴
		if(userEntity.getEmail() != null) {
			return new ResponseEntity<>(userEntity, HttpStatus.OK); //200

		}else {
			return new ResponseEntity<>(kakaoUser, HttpStatus.ACCEPTED); //202
										//이메일, 성별, 생일 정보만 들어잇는 객체
		}
		
	}
	
	@PostMapping("/kakaojwt")
	public void getKakaoJwt(@RequestBody Users user, HttpServletResponse response) {
		System.out.println("- 카카오 jwt토큰 요청");
		
		
		// 3. 토큰 만들기 (HMAC암호화 방식)
		String jwtToken = JWT.create()
				.withSubject(user.getEmail()) //토큰명
				.withExpiresAt(new Date(System.currentTimeMillis()+(60000*10))) //토큰 만료시간 (10분)
				.withClaim("email", user.getEmail()) //	비공개키. 원하는 정보 여러개 넣을 수 있다.
				.withClaim("role", user.getRoles().name())
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
		

		//	4. JWT토큰 Response
		response.setStatus(200);
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
		
		System.out.println("- 카카오 jwt 토큰 : " + jwtToken);
		
	}

}
