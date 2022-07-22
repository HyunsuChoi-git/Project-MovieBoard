package com.heracomp.memoboard_spring.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heracomp.memoboard_spring.domain.Memo;
import com.heracomp.memoboard_spring.domain.MemoRepository;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Transactional
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.MOCK) 		
public class MemoControllerIntegreTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private MemoRepository memoRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	@BeforeEach // 매 매소드가 실행되고 끝날 때마다 함수를 실행시켜주는 어노테이션
	public void init() {
		// db AUTO_INCREMENT는 함수 실행마다 계속 증가되므로 매번 초기화 시켜주어야 함. 번호증가 초기화 문법은 sql마다 다름
		//entityManager.createNamedQuery("ALTER TABLE memo ALTER COLUMN id RESTART WITH 1").executeUpdate();
		//entityManager.createNamedQuery("ALTER TABLE memo AUTO_INCREMENT = 1").executeUpdate();    MySQL 코드
		//entityManager.createNamedQuery("SELECT * FROM MEMO").executeUpdate();
		List<Memo> memoList = new ArrayList<>();
		memoList.add(new Memo(1L,"제목1","제목1"));
		memoList.add(new Memo(2L,"제목2","제목2"));
		memoList.add(new Memo(3L,"제목3","제목3"));
		memoRepository.save(memoList.get(0));
		memoRepository.save(memoList.get(1));
		memoRepository.save(memoList.get(2));
	}
	
	@AfterEach
	public void end() {
		memoRepository.deleteAll();
	}
	
	@Test
	public void save_test() throws Exception {
		log.info("save_test() 시작 ======================================");
		
		//1. given (테스트를 위한 준비)
		Memo memo = new Memo(null, "test제목", "test");
		String content = new ObjectMapper().writeValueAsString(memo);	
		
		//3. when (실행)
		ResultActions resultActions = mockMvc.perform(
												post("/memo")
												.contentType(MediaType.APPLICATION_JSON_UTF8)
												.content(content)
												.accept(MediaType.APPLICATION_JSON_UTF8)
										);
		
		//4. then (검증)
		resultActions.andExpect(status().isCreated())
		.andExpect(jsonPath("$.title").value("test제목"))	
		.andExpect(jsonPath("$.author").value("test"))
		.andDo(MockMvcResultHandlers.print());

	}
	
	@Test
	public void findAll_test() throws Exception {
		log.info("findAll_test() START ======================================");

		//given

		
		//when
		ResultActions resultActions = mockMvc.perform(
				get("/memo")
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$", Matchers.hasSize(3)))
			.andExpect(jsonPath("$.[0].title").value("제목1"))
			.andDo(MockMvcResultHandlers.print());
	}
	
	@Test
	public void findById_test() throws Exception {
		log.info("findById_test START =======================================");
		
		//given
		Long id = 1L;
		memoRepository.save(new Memo(1L,"첫번째 게시물","hera"));
		
		//when
		ResultActions resultActions = mockMvc.perform(
				get("/memo/"+id)
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(1))
			.andDo(MockMvcResultHandlers.print());

	}

	@Test
	public void update_test() throws Exception {
		log.info("update_test() START =======================================");
		
		//given
		memoRepository.save(new Memo(1L,"첫번째 게시물","hera"));
		Long id = (long) 1;
		Memo memo = new Memo(1L,"안녕하세요.","hera");
		
		String content = new ObjectMapper().writeValueAsString(memo);	
		
		//when
		ResultActions resultActions = mockMvc.perform(
				put("/memo/"+id)
				.contentType(MediaType.APPLICATION_JSON_UTF8)
				.content(content)
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andExpect(jsonPath("$.title").value("안녕하세요."))
			.andDo(MockMvcResultHandlers.print());

	}
	
	
	@Test
	public void delete_test() throws Exception {
		log.info("delete_test() START =======================================");
		
		//given
		Long id = (long) 1;
		memoRepository.save(new Memo(1L,"첫번째 게시물","hera"));
		
		//when
		ResultActions resultActions = mockMvc.perform(
				delete("/memo/"+id)
				.accept(MediaType.APPLICATION_JSON_UTF8)
				);
		
		//then
		resultActions.andExpect(status().isOk())
			.andDo(MockMvcResultHandlers.print());

	}
	
	
}
