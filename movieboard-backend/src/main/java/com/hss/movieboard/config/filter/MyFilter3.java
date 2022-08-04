package com.hss.movieboard.config.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyFilter3 implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
//		
//		if(req.getMethod().equals("POST")) {
//			String headerAuth = req.getHeader("Authorization");
//			System.out.println(headerAuth);			
//			
//			//허용하는 Authorization만 받고 나머지는 오류 뱉어내기
//			//  --> 로그인 요청이 오면 서버에서 토큰을 만들어 클라이언트에 응답해줌, 클라이언트는 이 토큰을 들고다니면서 서버에 요청할 때마다 Authorization에 응답받은 토큰을 넣어 요청함.
//			//      그러면 바로 여기서 그 토큰이 우리가 배포한 토큰인지 체크해주면 됨.
//			if(headerAuth.equals("hera")) {
//				chain.doFilter(req, res);
//			}else {
//				PrintWriter out = res.getWriter();
//				out.println("인증X");
//			}
//		}
		
		System.out.println("필터3");
		chain.doFilter(req, res);
		
	}
	
}
