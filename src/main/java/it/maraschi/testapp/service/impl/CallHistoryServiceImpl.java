package it.maraschi.testapp.service.impl;

import it.maraschi.testapp.service.CallHistoryService;
import it.maraschi.testapp.domain.CallHistory;
import it.maraschi.testapp.repository.CallHistoryRepository;
import it.maraschi.testapp.service.dto.CallHistoryDTO;
import it.maraschi.testapp.service.mapper.CallHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CallHistory}.
 */
@Service
@Transactional
public class CallHistoryServiceImpl implements CallHistoryService {

    private final Logger log = LoggerFactory.getLogger(CallHistoryServiceImpl.class);

    private final CallHistoryRepository callHistoryRepository;

    private final CallHistoryMapper callHistoryMapper;

    public CallHistoryServiceImpl(CallHistoryRepository callHistoryRepository, CallHistoryMapper callHistoryMapper) {
        this.callHistoryRepository = callHistoryRepository;
        this.callHistoryMapper = callHistoryMapper;
    }

    /**
     * Save a callHistory.
     *
     * @param callHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CallHistoryDTO save(CallHistoryDTO callHistoryDTO) {
        log.debug("Request to save CallHistory : {}", callHistoryDTO);
        CallHistory callHistory = callHistoryMapper.toEntity(callHistoryDTO);
        callHistory = callHistoryRepository.save(callHistory);
        return callHistoryMapper.toDto(callHistory);
    }

    /**
     * Get all the callHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CallHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CallHistories");
        return callHistoryRepository.findAll(pageable)
            .map(callHistoryMapper::toDto);
    }


    /**
     * Get one callHistory by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CallHistoryDTO> findOne(Long id) {
        log.debug("Request to get CallHistory : {}", id);
        return callHistoryRepository.findById(id)
            .map(callHistoryMapper::toDto);
    }

    /**
     * Delete the callHistory by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CallHistory : {}", id);
        callHistoryRepository.deleteById(id);
    }
}
