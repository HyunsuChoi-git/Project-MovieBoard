package com.hss.movieboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class MovieboardBackendApplication {
	
    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:aws.yml";

	public static void main(String[] args) {
		//SpringApplication.run(MovieboardBackendApplication.class, args);
		
		new SpringApplicationBuilder(MovieboardBackendApplication.class)
        .properties(APPLICATION_LOCATIONS)
        .run(args);
	}

}
