package com.hss.movieboard.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hss.movieboard.domain.dto.Users;

public interface UsersRepository extends JpaRepository<Users, String>{

    //public Optional<Users> findByEmail(String email);
	  
}
