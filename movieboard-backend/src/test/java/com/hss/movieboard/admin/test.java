package com.hss.movieboard.admin;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.hss.movieboard.domain.type.RoleLevel;
import com.hss.movieboard.service.MovieServiceUnitTest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
@WebMvcTest
public class test {
	
	@Test
	public void test() {
		
		RoleLevel.class.getEnclosingConstructor();
		log.info("  ----- test  ---->");
		System.out.println(RoleLevel.class.getEnclosingConstructor());
	}
}
