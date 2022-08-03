package com.hss.movieboard.config;

import org.springframework.web.filter.CorsFilter;

import com.hss.movieboard.filter.MyFilter3;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@SuppressWarnings("deprecation")
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final CorsFilter corsFilter;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.addFilterBefore(new MyFilter3(), BasicAuthenticationFilter.class);
		// filterChain 순서 중 BasicAuthenticationFilter가 실행되기 전에 만들어놓음 myFilter를 실행한다.
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	// 세션을 사용하지 않겠다.
		.and()
		.addFilter(corsFilter)			// 모든 요청이 이 filter를 탐. cors요청 모두 허용
		.formLogin().disable()			// form을 사용한 로그인방식을 쓰지 않는다.
		.httpBasic().disable()			// 기본적인 http방식을 쓰지 않는다.
		.authorizeRequests()			// 여기까지 jwt 기본 세팅
		.antMatchers("/api/v1/user/**")
		.access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
		.antMatchers("/api/v1/manager/**")
		.access("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
		.antMatchers("/api/v1/admin/**")
		.access("hasRole('ROLE_ADMIN')")
		.anyRequest().permitAll();
	}

	
}
