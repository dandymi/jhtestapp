package it.maraschi.testapp.service.impl;

import it.maraschi.testapp.service.CallService;
import it.maraschi.testapp.domain.Call;
import it.maraschi.testapp.repository.CallRepository;
import it.maraschi.testapp.service.dto.CallDTO;
import it.maraschi.testapp.service.mapper.CallMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Call}.
 */
@Service
@Transactional
public class CallServiceImpl implements CallService {

    private final Logger log = LoggerFactory.getLogger(CallServiceImpl.class);

    private final CallRepository callRepository;

    private final CallMapper callMapper;

    public CallServiceImpl(CallRepository callRepository, CallMapper callMapper) {
        this.callRepository = callRepository;
        this.callMapper = callMapper;
    }

    /**
     * Save a call.
     *
     * @param callDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CallDTO save(CallDTO callDTO) {
        log.debug("Request to save Call : {}", callDTO);
        Call call = callMapper.toEntity(callDTO);
        call = callRepository.save(call);
        return callMapper.toDto(call);
    }

    /**
     * Get all the calls.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CallDTO> findAll() {
        log.debug("Request to get all Calls");
        return callRepository.findAll().stream()
            .map(callMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one call by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CallDTO> findOne(Long id) {
        log.debug("Request to get Call : {}", id);
        return callRepository.findById(id)
            .map(callMapper::toDto);
    }

    /**
     * Delete the call by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Call : {}", id);
        callRepository.deleteById(id);
    }
}
