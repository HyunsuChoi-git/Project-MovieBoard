package com.hss.movieboard.domain.dto;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.hss.movieboard.domain.type.RoleLevel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Users {
	
	@Id	// PK지정
	private String email;
	private String pw;
	private String birth;
	private String gender;
	@Enumerated(EnumType.STRING)
	private RoleLevel roles;	//USER,ADMIN ...
	
	public List<String> getRuleList(){
		List<String> roleList = new ArrayList<>();
		Arrays.asList(RoleLevel.values()).forEach(r -> 
			roleList.add(r.name())
		);
		return roleList;
	}
	
}
