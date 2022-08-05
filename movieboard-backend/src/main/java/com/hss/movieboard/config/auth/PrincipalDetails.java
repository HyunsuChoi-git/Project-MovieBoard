package com.hss.movieboard.config.auth;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hss.movieboard.domain.dto.Users;

import lombok.Data;

@Data
public class PrincipalDetails implements UserDetails{
	
	private Users user;
	public PrincipalDetails(Users user) {
		this.user = user;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// 권한Rule 담아주기
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		user.getRuleList().forEach(r -> { authorities.add( () -> r ); });
		return authorities;
	}
	@Override
	public String getPassword() {
		return user.getPw();
	}
	@Override
	public String getUsername() {
		return user.getEmail();
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
