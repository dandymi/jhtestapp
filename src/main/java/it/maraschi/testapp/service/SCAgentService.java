package it.maraschi.testapp.service;

import it.maraschi.testapp.service.dto.SCAgentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link it.maraschi.testapp.domain.SCAgent}.
 */
public interface SCAgentService {

    /**
     * Save a sCAgent.
     *
     * @param sCAgentDTO the entity to save.
     * @return the persisted entity.
     */
    SCAgentDTO save(SCAgentDTO sCAgentDTO);

    /**
     * Get all the sCAgents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SCAgentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" sCAgent.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SCAgentDTO> findOne(Long id);

    /**
     * Delete the "id" sCAgent.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
