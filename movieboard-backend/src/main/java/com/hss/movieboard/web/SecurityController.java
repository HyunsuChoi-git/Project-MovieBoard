package com.hss.movieboard.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {
	
	@GetMapping("test")
	public String test() {
		
		return "<h1>TEST</h1>";
	}
	
	@PostMapping("test")
	public String test2() {
		
		return "<h1>POST</h1>";
	}
	
}
