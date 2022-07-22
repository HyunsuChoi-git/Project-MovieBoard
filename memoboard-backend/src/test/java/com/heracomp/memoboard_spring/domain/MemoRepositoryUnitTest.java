package com.heracomp.memoboard_spring.domain;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

//DB관련 Bean만 IoC에 띄워서 테스트하면됨.

/*
 *  Repository 단위테스트는 DB만 메모리에 띄우면 된다.
 *  
 *  @DataJpaTest : Jpa관련된 객체를 IOC 메모리에 띄워줌
 * 	@AutoConfigureTestDatabase : DB 설정 어노테이션
 * 		- Replace.ANY : 내장 DB 사용(가짜DB)
 * 		- Replace.NONE : 실제 DB 사용
 * 	@Transactional : 테스트 완료된 함수 rollback 시켜주는 어노테이션
 */

@Transactional
@AutoConfigureTestDatabase(replace = Replace.ANY)
@DataJpaTest
public class MemoRepositoryUnitTest {
	
	@Autowired
	private MemoRepository memoRepository;
	
	
	@Test
	public void save_Test() {
		//given
		Memo memo = new Memo(null, "저장","저장테스트");
		
		//when
		Memo saveResult = memoRepository.save(memo);
		
		//then
		assertEquals("저장", saveResult.getTitle());
	}
	
}
