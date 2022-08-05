package com.hss.movieboard.config;

import org.springframework.web.filter.CorsFilter;

import com.hss.movieboard.config.jwt.JwtAuthenticationFilter;
import com.hss.movieboard.config.jwt.JwtAuthorizationFilter;
import com.hss.movieboard.domain.UsersRepository;
import com.hss.movieboard.domain.type.RoleLevel;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@SuppressWarnings("deprecation")
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	

	private final CorsFilter corsFilter;
	private final UsersRepository usersRepository;

	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	// 세션을 사용하지 않겠다.
		.and()
		.addFilter(corsFilter)			// 모든 요청이 이 filter를 탐. cors요청 모두 허용
		.formLogin().disable()			// form을 사용한 로그인방식을 쓰지 않는다.
		.httpBasic().disable()			// 기본적인 http방식을 쓰지 않는다.
		.addFilter(new JwtAuthenticationFilter(authenticationManager()))     // /login 으로 들어오는 로그임Form을 받는 Filter.
		.addFilter(new JwtAuthorizationFilter(authenticationManager(), usersRepository))		// 토큰체크 및 권한체크 요청 시 받아주는 Filter
		.authorizeRequests()			// 여기까지 jwt 기본 세팅
		.antMatchers("/user/**")
		.access(String.format("hasRole('%s') or hasRole('%s') or hasRole('%s')", RoleLevel.ROLE_USER, RoleLevel.ROLE_MANAGER, RoleLevel.ROLE_ADMIN))
		.antMatchers("/manager/**")
		.access(String.format("hasRole('%s') or hasRole('%s')", RoleLevel.ROLE_MANAGER, RoleLevel.ROLE_ADMIN))
		.antMatchers("/admin/**")
		.access(String.format("hasRole('%s')", RoleLevel.ROLE_ADMIN))
		.anyRequest().permitAll()
		;
	}
	
	// IOC컨테이너에서 BCryptPasswordEncoder를 찾아 password를 암호화 해서 체크해줌
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	
}
