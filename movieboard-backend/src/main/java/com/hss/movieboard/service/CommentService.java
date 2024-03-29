package com.hss.movieboard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hss.movieboard.domain.CommentRepository;
import com.hss.movieboard.domain.dto.Comment;
import com.hss.movieboard.domain.dto.Users;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentService {
	
	private final CommentRepository commentRepository;
	
	// 등록
	@Transactional
	public String saveComment(Comment comment) {
		
		commentRepository.save(comment);
		
		return "ok";
	}
	
	// 삭제
	@Transactional
	public String deleteComment(Long id) {
		
		// id 삭제하기
		commentRepository.deleteById(id);
		
		return "ok";
	}
	
	
	// 수정
	@Transactional
	public Comment updateComment(Comment comment) {
		
		Comment commentEntity = commentRepository.findById(comment.getId())
				.orElseThrow(() -> new IllegalArgumentException("코멘트가 존재하지 않습니다."));
		commentEntity.setContent(comment.getContent());

		return commentEntity;
	}
	
	
	// 영화별로 불러오기
	@Transactional
	public List<Comment> getMovieComments(Long titleId, String title) {

		return commentRepository.findByTitleIdAndTitle(titleId, title);
	}
	
	
	// 전체 불러오기
	@Transactional
	public List<Comment> getAllComments() {
		
		return commentRepository.findAll();
	}
	
	
	//영화 삭제되면 코멘트도 전체 삭제
	@Transactional
	public void deleteMovieComments(Long id) {
		
		commentRepository.deleteByTitleId(id);
	}

}
