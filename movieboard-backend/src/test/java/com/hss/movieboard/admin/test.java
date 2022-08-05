package com.hss.movieboard.admin;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.hss.movieboard.domain.type.RoleLevel;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ExtendWith(SpringExtension.class)
public class test {
	
	@Test
	public void test() {
		
		Map<String, Object> enums = new LinkedHashMap<>();
		log.info("  ----- test  ---->");
		System.out.println(RoleLevel.class.getEnumConstants());
		System.out.println(enums.put("RoleLevel", RoleLevel.class.getEnumConstants()));
	
	}
}
