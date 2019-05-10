package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.service.SCAgentService;
import it.maraschi.testapp.web.rest.errors.BadRequestAlertException;
import it.maraschi.testapp.service.dto.SCAgentDTO;

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
 * REST controller for managing {@link it.maraschi.testapp.domain.SCAgent}.
 */
@RestController
@RequestMapping("/api")
public class SCAgentResource {

    private final Logger log = LoggerFactory.getLogger(SCAgentResource.class);

    private static final String ENTITY_NAME = "sCAgent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SCAgentService sCAgentService;

    public SCAgentResource(SCAgentService sCAgentService) {
        this.sCAgentService = sCAgentService;
    }

    /**
     * {@code POST  /sc-agents} : Create a new sCAgent.
     *
     * @param sCAgentDTO the sCAgentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sCAgentDTO, or with status {@code 400 (Bad Request)} if the sCAgent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sc-agents")
    public ResponseEntity<SCAgentDTO> createSCAgent(@Valid @RequestBody SCAgentDTO sCAgentDTO) throws URISyntaxException {
        log.debug("REST request to save SCAgent : {}", sCAgentDTO);
        if (sCAgentDTO.getId() != null) {
            throw new BadRequestAlertException("A new sCAgent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SCAgentDTO result = sCAgentService.save(sCAgentDTO);
        return ResponseEntity.created(new URI("/api/sc-agents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sc-agents} : Updates an existing sCAgent.
     *
     * @param sCAgentDTO the sCAgentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sCAgentDTO,
     * or with status {@code 400 (Bad Request)} if the sCAgentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sCAgentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sc-agents")
    public ResponseEntity<SCAgentDTO> updateSCAgent(@Valid @RequestBody SCAgentDTO sCAgentDTO) throws URISyntaxException {
        log.debug("REST request to update SCAgent : {}", sCAgentDTO);
        if (sCAgentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SCAgentDTO result = sCAgentService.save(sCAgentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sCAgentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sc-agents} : get all the sCAgents.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sCAgents in body.
     */
    @GetMapping("/sc-agents")
    public ResponseEntity<List<SCAgentDTO>> getAllSCAgents(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of SCAgents");
        Page<SCAgentDTO> page = sCAgentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sc-agents/:id} : get the "id" sCAgent.
     *
     * @param id the id of the sCAgentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sCAgentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sc-agents/{id}")
    public ResponseEntity<SCAgentDTO> getSCAgent(@PathVariable Long id) {
        log.debug("REST request to get SCAgent : {}", id);
        Optional<SCAgentDTO> sCAgentDTO = sCAgentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sCAgentDTO);
    }

    /**
     * {@code DELETE  /sc-agents/:id} : delete the "id" sCAgent.
     *
     * @param id the id of the sCAgentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sc-agents/{id}")
    public ResponseEntity<Void> deleteSCAgent(@PathVariable Long id) {
        log.debug("REST request to delete SCAgent : {}", id);
        sCAgentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
