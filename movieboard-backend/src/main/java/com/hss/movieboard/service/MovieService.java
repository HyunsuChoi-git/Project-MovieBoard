package com.hss.movieboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hss.movieboard.domain.CommentRepository;
import com.hss.movieboard.domain.MovieRepository;
import com.hss.movieboard.domain.dto.Movie;

import lombok.RequiredArgsConstructor;


//기능을 정의할 수 있고, 트랜잭션을 관리할 수 있음.
// service --> 여러곳에서 데이터를 가져와 쿼리실행 등의 기능을 수행하는 곳. 절차를 커밋~ 롤백~ 등의 트랜잭션 수행!!!!
@Service
@RequiredArgsConstructor   // final 붙은 애들의 자동 생성자 만들기
public class MovieService {
	
	private final MovieRepository movieRepository;
	private final CommentService commentService;
	
	private String folderPath = "C:\\Users\\HS\\Desktop\\React workspace\\Project-MovieBoard\\movieboard-frontend\\public\\image\\";
//	private String folderPath = "C:\\Users\\kim\\Desktop\\workspace\\Project-MovieBoard\\movieboard-frontend\\public\\image\\";
	private String basicFilename = "basic.png";
	
	@Transactional   // 서비스 함수가 종료될 때(return될 떄) data를 커밋할 지, 롤백할 지 관리함.
	public Movie saveMovie(Movie movie) {

		if(movie.getPhoto() == null) {
			movie.setPhoto(basicFilename);
		}
		
		return movieRepository.save(movie);
	}
	
	
	// JPA는 변경감지하는 내부기능이 있는데, 비활성화하므로써 내부연산을 줄임.
	// select 시 @Transaction 걸면, 밖에서 우리가 select하여는 데이터를 update(수정)해도 transaction 내부에서는 변하지않음.
	// but insert는 insert된 결과가 나옴(팬텀현상 못막음.). update만 막아줌. (원본은 바뀐건데 transaction내에서만 바뀌기 전 데이터!!)
	@Transactional(readOnly = true)   
	public Movie getMovie(Long id) {
		
		// findById 는 못찾을 수 있기 때문에 오류에대한 exception처리를 해주어야 한다.
		return movieRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("id를 확인하세요"));
	}
	
	@Transactional(readOnly = true) 
	public List<Movie> getAllMovies() {
		
		return movieRepository.findAll();
	}
	
	@Transactional
	public Movie modifyMovie(Long id, Movie movie) {
		//더티체킹
		
		//1. db에서 실제 값을 들고옴 (영속화 : spring내부에 해당 데이터를 들고 있는 것. 영속성 컨텍스트에 보관)
		Movie movieEntity = movieRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("id를 확인하세요"));
		//2. 영속화된 데이터를 받아서 수정하기
		movieEntity.setTitle(movie.getTitle());
		movieEntity.setDirector(movie.getDirector());
		movieEntity.setGenre(movie.getGenre());
		movieEntity.setGrade(movie.getGrade());
		if(movie.getPhoto() != null) {
			movieEntity.setPhoto(movie.getPhoto());
		}
		//3. 수정된 데이터 리턴하기
		return movieEntity;
		//4. 함수 종료시 => 트랜젝션 종료 => 영속화 되어있는 데이터를 DB에 갱신(flush) => commit  
		// 1~4 의 과정을 더티체킹이라고 한다.
	}
	
	@Transactional
	public String deleteMovie(Long id) {

		deletePhoto(id);

		movieRepository.deleteById(id); //오류가 나면 알아서 exception을 타므로 따로 exception처리 해줄 필요 X
		commentService.deleteMovieComments(id);
		return "ok";
	}


	public void savePhoto(MultipartFile file, String filename) throws IllegalStateException, IOException {
		file.transferTo(new File(folderPath+filename));
	}
	
	
	public void deletePhoto(Long id) {
		Optional<Movie> opMovie = movieRepository.findById(id);
		Movie movie = opMovie.get();
		String filename = movie.getPhoto();
		File file = new File(folderPath + filename);
		
		if(file.exists() && !filename.equals(basicFilename)) { // 파일이 존재하면
			file.delete(); // 파일 삭제	
		}
	}

}
