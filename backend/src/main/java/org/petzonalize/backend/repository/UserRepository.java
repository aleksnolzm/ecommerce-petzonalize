package org.petzonalize.backend.repository;

import java.util.Optional;

import org.petzonalize.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	void deleteByEmail(String email);
	Optional<User> findByEmail(String email);
}
