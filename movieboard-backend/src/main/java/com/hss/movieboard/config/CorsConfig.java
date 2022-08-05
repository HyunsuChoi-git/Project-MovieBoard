package com.hss.movieboard.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.hss.movieboard.domain.type.JwtProperties;

@Configuration
public class CorsConfig {
	
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);	// 서버가 응답할 때 json을 자바스크립트에서 처리할 수 있도록 할 지 설정하는 것. @CrossOrigin -> 인증없을때만 사용.
		config.addAllowedOriginPattern("*");	// 모든 ip에 응답을 허용
		config.addAllowedHeader("*");	// 모든 header에 응답 허용
		config.addAllowedMethod("*");	// 모든 post, get, put, delete, fetch 응답 허용
		source.registerCorsConfiguration("/**", config);
		config.addExposedHeader(JwtProperties.HEADER_STRING);
		
		return new CorsFilter(source);
	}
}
