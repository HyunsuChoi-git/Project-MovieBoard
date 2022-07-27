package com.hss.movieboard.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Movie {
	@Id	// PK지정
	@GeneratedValue(strategy = GenerationType.IDENTITY)  //해당 데이터베이스 번호증가 전략을 따라가겠다.	
	private Long id;
	
	private String title;
	private String director;
	private String genre;
	
	@Min(0)
	@Max(10)
	private int grade;
	
	private String photo;
	
	private String memo;

}
