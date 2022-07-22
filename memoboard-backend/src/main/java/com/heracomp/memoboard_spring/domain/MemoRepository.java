package com.heracomp.memoboard_spring.domain;

import org.springframework.data.jpa.repository.JpaRepository;

//@Repository 적어야 스프링 IoC에 빈으로 등록되는ㄷㅔ  --> DB에 data를 insert하거나 get하거나
// JpaRepository를 상속받으면 생략가능하다
// CRUD 함수를 들고 있어서 그걸 사용하면 된다.
public interface MemoRepository extends JpaRepository<Memo, Long>{

}
