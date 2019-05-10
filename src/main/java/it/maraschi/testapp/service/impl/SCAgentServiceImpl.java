package it.maraschi.testapp.service.impl;

import it.maraschi.testapp.service.SCAgentService;
import it.maraschi.testapp.domain.SCAgent;
import it.maraschi.testapp.repository.SCAgentRepository;
import it.maraschi.testapp.service.dto.SCAgentDTO;
import it.maraschi.testapp.service.mapper.SCAgentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link SCAgent}.
 */
@Service
@Transactional
public class SCAgentServiceImpl implements SCAgentService {

    private final Logger log = LoggerFactory.getLogger(SCAgentServiceImpl.class);

    private final SCAgentRepository sCAgentRepository;

    private final SCAgentMapper sCAgentMapper;

    public SCAgentServiceImpl(SCAgentRepository sCAgentRepository, SCAgentMapper sCAgentMapper) {
        this.sCAgentRepository = sCAgentRepository;
        this.sCAgentMapper = sCAgentMapper;
    }

    /**
     * Save a sCAgent.
     *
     * @param sCAgentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SCAgentDTO save(SCAgentDTO sCAgentDTO) {
        log.debug("Request to save SCAgent : {}", sCAgentDTO);
        SCAgent sCAgent = sCAgentMapper.toEntity(sCAgentDTO);
        sCAgent = sCAgentRepository.save(sCAgent);
        return sCAgentMapper.toDto(sCAgent);
    }

    /**
     * Get all the sCAgents.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SCAgentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SCAgents");
        return sCAgentRepository.findAll(pageable)
            .map(sCAgentMapper::toDto);
    }


    /**
     * Get one sCAgent by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SCAgentDTO> findOne(Long id) {
        log.debug("Request to get SCAgent : {}", id);
        return sCAgentRepository.findById(id)
            .map(sCAgentMapper::toDto);
    }

    /**
     * Delete the sCAgent by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SCAgent : {}", id);
        sCAgentRepository.deleteById(id);
    }
}
