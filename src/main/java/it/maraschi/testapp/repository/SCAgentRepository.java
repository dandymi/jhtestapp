package it.maraschi.testapp.repository;

import it.maraschi.testapp.domain.SCAgent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SCAgent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SCAgentRepository extends JpaRepository<SCAgent, Long> {

}
