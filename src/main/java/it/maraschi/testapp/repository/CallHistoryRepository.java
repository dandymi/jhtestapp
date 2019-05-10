package it.maraschi.testapp.repository;

import it.maraschi.testapp.domain.CallHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CallHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CallHistoryRepository extends JpaRepository<CallHistory, Long> {

}
