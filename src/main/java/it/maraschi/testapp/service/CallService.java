package it.maraschi.testapp.service;

import it.maraschi.testapp.service.dto.CallDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link it.maraschi.testapp.domain.Call}.
 */
public interface CallService {

    /**
     * Save a call.
     *
     * @param callDTO the entity to save.
     * @return the persisted entity.
     */
    CallDTO save(CallDTO callDTO);

    /**
     * Get all the calls.
     *
     * @return the list of entities.
     */
    List<CallDTO> findAll();


    /**
     * Get the "id" call.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CallDTO> findOne(Long id);

    /**
     * Delete the "id" call.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
