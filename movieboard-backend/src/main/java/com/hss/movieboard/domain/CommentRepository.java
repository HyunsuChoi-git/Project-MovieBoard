package com.hss.movieboard.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hss.movieboard.domain.dto.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	// ID값 제외한 정보로 데이터 추출
	Optional<Comment> findByTitleAndEmailAndContent(String title, String email, String content);


	List<Comment> findByTitleIdAndTitle(Long titleId, String title);


	void deleteByTitleId(Long id);
	
	
	
}
