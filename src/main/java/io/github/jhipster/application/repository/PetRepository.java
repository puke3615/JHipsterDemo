package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Pet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Pet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("select pet from Pet pet where pet.user.login = ?#{principal.username}")
    List<Pet> findByUserIsCurrentUser();

}
