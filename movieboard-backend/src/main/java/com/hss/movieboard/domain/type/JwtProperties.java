package com.hss.movieboard.domain.type;


public interface JwtProperties {
	String TOKEN_PREFIX = "bearer ";
	String SECRET = "moving";
	String HEADER_STRING = "Authorization";
	int EXPIRATION_TIME = 60000*10; //10분
	
}
