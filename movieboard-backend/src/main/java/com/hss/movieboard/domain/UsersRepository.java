package com.hss.movieboard.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String>{

    //public Optional<Users> findByEmail(String email);
	  
}
