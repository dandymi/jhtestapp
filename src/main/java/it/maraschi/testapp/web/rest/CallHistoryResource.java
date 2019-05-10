package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.service.CallHistoryService;
import it.maraschi.testapp.web.rest.errors.BadRequestAlertException;
import it.maraschi.testapp.service.dto.CallHistoryDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link it.maraschi.testapp.domain.CallHistory}.
 */
@RestController
@RequestMapping("/api")
public class CallHistoryResource {

    private final Logger log = LoggerFactory.getLogger(CallHistoryResource.class);

    private static final String ENTITY_NAME = "callHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CallHistoryService callHistoryService;

    public CallHistoryResource(CallHistoryService callHistoryService) {
        this.callHistoryService = callHistoryService;
    }

    /**
     * {@code POST  /call-histories} : Create a new callHistory.
     *
     * @param callHistoryDTO the callHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new callHistoryDTO, or with status {@code 400 (Bad Request)} if the callHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/call-histories")
    public ResponseEntity<CallHistoryDTO> createCallHistory(@Valid @RequestBody CallHistoryDTO callHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save CallHistory : {}", callHistoryDTO);
        if (callHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new callHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CallHistoryDTO result = callHistoryService.save(callHistoryDTO);
        return ResponseEntity.created(new URI("/api/call-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /call-histories} : Updates an existing callHistory.
     *
     * @param callHistoryDTO the callHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated callHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the callHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the callHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/call-histories")
    public ResponseEntity<CallHistoryDTO> updateCallHistory(@Valid @RequestBody CallHistoryDTO callHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update CallHistory : {}", callHistoryDTO);
        if (callHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CallHistoryDTO result = callHistoryService.save(callHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, callHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /call-histories} : get all the callHistories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of callHistories in body.
     */
    @GetMapping("/call-histories")
    public ResponseEntity<List<CallHistoryDTO>> getAllCallHistories(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of CallHistories");
        Page<CallHistoryDTO> page = callHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /call-histories/:id} : get the "id" callHistory.
     *
     * @param id the id of the callHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the callHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/call-histories/{id}")
    public ResponseEntity<CallHistoryDTO> getCallHistory(@PathVariable Long id) {
        log.debug("REST request to get CallHistory : {}", id);
        Optional<CallHistoryDTO> callHistoryDTO = callHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(callHistoryDTO);
    }

    /**
     * {@code DELETE  /call-histories/:id} : delete the "id" callHistory.
     *
     * @param id the id of the callHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/call-histories/{id}")
    public ResponseEntity<Void> deleteCallHistory(@PathVariable Long id) {
        log.debug("REST request to delete CallHistory : {}", id);
        callHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
