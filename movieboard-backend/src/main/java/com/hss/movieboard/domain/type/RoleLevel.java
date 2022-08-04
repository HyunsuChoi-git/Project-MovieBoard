package com.hss.movieboard.domain.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RoleLevel {
	ROLE_USER("일반"),
	ROLE_MANAGER("운영자"),
	ROLE_ADMIN("관리자");
	
	private final String description;
	
}
