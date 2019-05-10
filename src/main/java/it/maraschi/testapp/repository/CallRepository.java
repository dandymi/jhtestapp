package it.maraschi.testapp.repository;

import it.maraschi.testapp.domain.Call;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Call entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CallRepository extends JpaRepository<Call, Long> {

}
