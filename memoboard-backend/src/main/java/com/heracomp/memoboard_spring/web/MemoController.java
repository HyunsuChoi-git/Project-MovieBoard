package com.heracomp.memoboard_spring.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.heracomp.memoboard_spring.domain.Memo;
import com.heracomp.memoboard_spring.service.MemoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MemoController {
	
	private final MemoService memoService;
	
	
	@PostMapping("/memo")
	public ResponseEntity<?> save(@RequestBody Memo memo){
		return new ResponseEntity<>(memoService.saveMemo(memo), HttpStatus.CREATED); //200
	}
	
	@GetMapping("/memo")
	public ResponseEntity<?> findAll(){
		// ResponseEntity타입은 http status 코드도 함께 보낼 수 있어서 쓰임
		return new ResponseEntity<>(memoService.getAllMemos(), HttpStatus.OK); //200
	}
	
	@GetMapping("/memo/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id){
		return new ResponseEntity<>(memoService.getMemo(id), HttpStatus.OK); //200
	}
	
	@PutMapping("/memo/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Memo memo){
		return new ResponseEntity<>(memoService.modifyMemo(id, memo), HttpStatus.OK); //200
	}
	
	@DeleteMapping("/memo/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		return new ResponseEntity<>(memoService.deleteMemo(id), HttpStatus.OK); //200
		
		
	}
}
