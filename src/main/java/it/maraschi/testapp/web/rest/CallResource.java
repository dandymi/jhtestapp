package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.service.CallService;
import it.maraschi.testapp.web.rest.errors.BadRequestAlertException;
import it.maraschi.testapp.service.dto.CallDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link it.maraschi.testapp.domain.Call}.
 */
@RestController
@RequestMapping("/api")
public class CallResource {

    private final Logger log = LoggerFactory.getLogger(CallResource.class);

    private static final String ENTITY_NAME = "call";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CallService callService;

    public CallResource(CallService callService) {
        this.callService = callService;
    }

    /**
     * {@code POST  /calls} : Create a new call.
     *
     * @param callDTO the callDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new callDTO, or with status {@code 400 (Bad Request)} if the call has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/calls")
    public ResponseEntity<CallDTO> createCall(@RequestBody CallDTO callDTO) throws URISyntaxException {
        log.debug("REST request to save Call : {}", callDTO);
        if (callDTO.getId() != null) {
            throw new BadRequestAlertException("A new call cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CallDTO result = callService.save(callDTO);
        return ResponseEntity.created(new URI("/api/calls/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /calls} : Updates an existing call.
     *
     * @param callDTO the callDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated callDTO,
     * or with status {@code 400 (Bad Request)} if the callDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the callDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/calls")
    public ResponseEntity<CallDTO> updateCall(@RequestBody CallDTO callDTO) throws URISyntaxException {
        log.debug("REST request to update Call : {}", callDTO);
        if (callDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CallDTO result = callService.save(callDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, callDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /calls} : get all the calls.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calls in body.
     */
    @GetMapping("/calls")
    public List<CallDTO> getAllCalls() {
        log.debug("REST request to get all Calls");
        return callService.findAll();
    }

    /**
     * {@code GET  /calls/:id} : get the "id" call.
     *
     * @param id the id of the callDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the callDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/calls/{id}")
    public ResponseEntity<CallDTO> getCall(@PathVariable Long id) {
        log.debug("REST request to get Call : {}", id);
        Optional<CallDTO> callDTO = callService.findOne(id);
        return ResponseUtil.wrapOrNotFound(callDTO);
    }

    /**
     * {@code DELETE  /calls/:id} : delete the "id" call.
     *
     * @param id the id of the callDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/calls/{id}")
    public ResponseEntity<Void> deleteCall(@PathVariable Long id) {
        log.debug("REST request to delete Call : {}", id);
        callService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
