package com.hss.movieboard.service;

import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.hss.movieboard.domain.MovieRepository;
import com.hss.movieboard.domain.dto.Movie;

import lombok.extern.slf4j.Slf4j;

// service에 관련된 bean(MovieRepository)만 IoC에 띄워서 테스트 하면 됨

/*
 * Service 단위테스트
 * 
 * MockitoExtension.class : 가짜 메모리 환경 만들기.
 *    - Service 테스트시에는 Repository관련 객체만 필요. ==> 객체를 가짜 메모리에 올려서 사용.
 *    - Movkito가 가짜 메모리. 
 *    - Mockito를 쓰면 SpringIoc에 Bean이 올라오는게 아니라 Mockito라는 메모리 공간에 올리는 것.
 * 
 * @Mock : Mockito에 Bean생성하는 어노테이션
 * @InjectMocks : Mockito에 올라온 객체를 모두 주입받는 어노테이션. 
 * 
 */
@Slf4j
@ExtendWith(MockitoExtension.class)
public class MovieServiceUnitTest {
	
	@InjectMocks
	private MovieService movieService;
	
	@Mock
	private MovieRepository movieRepository;
	
	
	@Test
	public void saveMovie_Test() {
		log.info("saveMovie_Test() 시작 ======================================");
		
		// given
		Movie movie = new Movie(1L,"저장","저장테스트","스릴러",4, "", "");
		when(movieRepository.save(movie)).thenReturn(movie);
			
		//when
		Movie saveResult = movieService.saveMovie(movie);
		
		//then
		assertEquals(saveResult, movie);
	}


	
}
