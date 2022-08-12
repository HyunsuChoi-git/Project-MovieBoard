
package com.hss.movieboard.web;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hss.movieboard.domain.dto.Comment;
import com.hss.movieboard.service.CommentService;

import lombok.RequiredArgsConstructor;

//security 라이브러리를 적용하면 CORS정책을 가지고있어서 security 단에서 CORS를 해제해주면 된다.
@RestController
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;
	
	@PostMapping("/user/comment")	// 코멘트 등록
	public ResponseEntity<?> saveComment(@RequestPart("comment") Comment comment) {	
		System.out.println("코멘트 등록");
		return new ResponseEntity<>(commentService.saveComment(comment), HttpStatus.OK);
	}
	
	@DeleteMapping("/user/comment/{id}")	//코멘트 삭제
	public ResponseEntity<?> deleteComment(@PathVariable Long id) {
		return new ResponseEntity<>(commentService.deleteComment(id), HttpStatus.OK);
	}

	@PutMapping("/user/comment/{id}")	//코멘트 수정
	public ResponseEntity<?> updateComment(@RequestPart("comment") Comment comment) {	
		return new ResponseEntity<>(commentService.updateComment(comment), HttpStatus.OK);
	}
	
	@GetMapping("/comment/{titleId}&{title}")	// 영화별 코멘트 추출
	public List<Comment> getMovieComments(@PathVariable Long titleId, @PathVariable String title ) {
		return commentService.getMovieComments(titleId, title);
	}
	
	@GetMapping("/user/comment")	// 전체코멘트 불러오기
	public List<Comment> getAllComments() {
		return commentService.getAllComments();
	}
}
