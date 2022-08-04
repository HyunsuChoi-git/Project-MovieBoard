package com.hss.movieboard.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.hss.movieboard.config.filter.MyFilter1;
import com.hss.movieboard.config.filter.MyFilter2;

@Configuration
public class FilterConfig {
	
	@Bean
	public FilterRegistrationBean<MyFilter1> filter1() {
		FilterRegistrationBean<MyFilter1> bean = new FilterRegistrationBean<>(new MyFilter1());
		bean.addUrlPatterns("/*");	// 모든요청
		bean.setOrder(1); // filter 우선순위 지정. 0 -> 가장 낮은 번호가 필터중에 가장 먼저 실행됨.
		
		return bean;
	}
	@Bean
	public FilterRegistrationBean<MyFilter2> filter2() {
		FilterRegistrationBean<MyFilter2> bean = new FilterRegistrationBean<>(new MyFilter2());
		bean.addUrlPatterns("/*");	// 모든요청
		bean.setOrder(0); // filter 우선순위 지정. 0 -> 가장 낮은 번호가 필터중에 가장 먼저 실행됨.
		
		return bean;
	}

}
