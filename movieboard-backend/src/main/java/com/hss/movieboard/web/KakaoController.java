package com.hss.movieboard.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hss.movieboard.service.KakaoService;
import com.hss.movieboard.service.UsersService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class KakaoController {
	
	private final KakaoService kakaoService;
	
	
	@GetMapping("/kakao/*")
	public void getAccessToken(@RequestParam String code, @RequestParam String client_id, @RequestParam String redirect_uri) {
		System.out.println("code : "+ code);
		System.out.println("client_id : "+client_id);
		System.out.println("redirect_uri : "+redirect_uri);
		
		kakaoService.getAccessToken(code, client_id, redirect_uri);
	}
	
	
	@GetMapping("/kakaotoken/*")
	public void getUserInfo(@RequestParam String access_token, @RequestParam String client_id, @RequestParam String redirect_uri) {
		System.out.println("access_token : "+ access_token);
		System.out.println("client_id : "+client_id);
		System.out.println("redirect_uri : "+redirect_uri);
		
		
		kakaoService.createKakaoUser(access_token);
	}

}
