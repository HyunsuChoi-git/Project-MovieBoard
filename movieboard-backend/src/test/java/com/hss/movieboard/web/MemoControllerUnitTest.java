package com.hss.movieboard.web;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hss.movieboard.domain.Movie;
import com.hss.movieboard.service.MovieService;

import lombok.extern.slf4j.Slf4j;

//Unit 단위테스트 
//	: 컨트롤러 관련 로직만 IoC에 띄워 테스트 ( Filter, ControllerAdvice 등이 메모리에 뜸)


//@ExtendWith(SpringExtension.class) // **이 파일은 프로젝트랑 전혀 관련이 없는 일반 자바파일로. 스프링환경에서 테스트할 목적이면 꼭 이 어노테이션이 필요하다
//JUNIT5 에는 @WebMvcTest 내부에 @WebMvcTest가 있어서 안적어도 됨.

@Slf4j
@WebMvcTest   // controller 테스트를 위한 어노테이션
public class MemoControllerUnitTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean		// IoC환경에 모의 Bean을 등록해주는 어노테이션. 가짜빈
					// 진짜 Bean을 사용하면 Repository까지 전부 올려야하므로. 가짜를 올린다. Service내부 기능은 ServiceUnit테스트에서 하고,
					// 여기서는 함수자체 기능만 잘 되는지(service까지 잘 도달하는지)만 테스트하면 됨.
	private MovieService movieService;
	
	
	//BDDMokito 패턴을 이용한 test (given when then 형식)
	
	public void save_test() throws Exception {
		log.info("save_test() 시작 ======================================");
		
		//1. given (테스트를 위한 준비)
			// test데이터 준비
		Movie movie = new Movie(null, "test제목", "test내용");
		String content = new ObjectMapper().writeValueAsString(movie);	
						// 객체를 Json으로 parsing해주는 메소드.
						// save메소드는 pustMapping방식으로, Json객체를 파라미터로 받기 때문에 test데이터를 json으로 parging하여 준비.
		
			// 성공 결과 리턴값 지정해주기  
			//     ---> 해당 테스트에서 실행될 메소드의 객체 movieService는 모의객체라 메소드 실행 후에 아무런 변화가 없음. 따라서 성공시 결과값을 지정해주는 것.
		when(movieService.saveMovie(movie)).thenReturn(new Movie(null, "test제목", "test내용"));
		
		
		//3. when (실행)
		ResultActions resultActions = mockMvc.perform(
												post("/movie")		// 전송방식, url
												.contentType(MediaType.APPLICATION_JSON_UTF8) 	// 받을 데이터 인코딩 지정
												.content(content)	// 실제 전송할 테스트 데이터
												.accept(MediaType.APPLICATION_JSON_UTF8)	// 결과보낼 데이터 인코딩 지정
										);
		
		//4. then (검증)
		resultActions.andExpect(status().isCreated())	// 상태
		.andExpect(jsonPath("$.title").value("test제목"))		// jsonPath 문법을 이용해서 결과데이터 검증
		.andExpect(jsonPath("$.content").value("test내용"))
		.andDo(MockMvcResultHandlers.print());		// console에 test결과 출력

	}
	

	public void findAll_test() throws Exception {
		log.info("findAll_test() START ======================================");
		
		//given
		List<Movie> movieList = new ArrayList<>();
		movieList.add(new Movie(1L,"제목1","제목1"));
		movieList.add(new Movie(2L,"제목2","제목2"));
		movieList.add(new Movie(3L,"제목3","제목3"));

		when(movieService.getAllMovies()).thenReturn(movieList);
		
		//when
		ResultActions resultActions = mockMvc.perform(
				get("/movie")
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$", Matchers.hasSize(3)))
			.andExpect(jsonPath("$.[0].title").value("제목1"))
			.andDo(MockMvcResultHandlers.print());
	}
	

	public void findById_test() throws Exception {
		log.info("findById_test START =======================================");
		
		//given
		Long id = (long) 1;
		when(movieService.getMovie(id)).thenReturn(new Movie(1L,"첫번째 게시물","hera"));
		
		//when
		ResultActions resultActions = mockMvc.perform(
				get("/movie/"+id)
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(id.toString())
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(1))
			.andDo(MockMvcResultHandlers.print());

	}
	

	public void update_test() throws Exception {
		log.info("update_test() START =======================================");
		
		//given
		Long id = (long) 1;
		Movie movie = new Movie(1L,"첫번째 영화","hera");
		String content = new ObjectMapper().writeValueAsString(movie);	
		when(movieService.modifyMovie(id, movie)).thenReturn(new Movie(1L,"첫번째 영화","hera"));
		
		//when
		ResultActions resultActions = mockMvc.perform(
				put("/movie/"+id)
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(content)
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$.title").value("첫번째 영화"))
			.andDo(MockMvcResultHandlers.print());

	}
	
	@Test
	public void delete_test() throws Exception {
		log.info("delete_test() START =======================================");
		
		//given
		Long id = (long) 1;
		
		when(movieService.deleteMovie(id)).thenReturn("ok");
		
		//when
		ResultActions resultActions = mockMvc.perform(
				delete("/movie/"+id)
				.accept(MediaType.TEXT_PLAIN)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andDo(MockMvcResultHandlers.print());
		
		// 리턴값으로 String을 받아보고 싶을 때에는 아래 과정을 더 거쳐주어야 한다.
		MvcResult requestResult = resultActions.andReturn();
		String result = requestResult.getResponse().getContentAsString();
		
		assertEquals("ok", result);
		
		System.out.println(result);

	}
	
	
	
	
	
	
	
	
}
