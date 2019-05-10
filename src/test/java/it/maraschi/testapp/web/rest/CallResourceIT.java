package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.JhtestappApp;
import it.maraschi.testapp.domain.Call;
import it.maraschi.testapp.repository.CallRepository;
import it.maraschi.testapp.service.CallService;
import it.maraschi.testapp.service.dto.CallDTO;
import it.maraschi.testapp.service.mapper.CallMapper;
import it.maraschi.testapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static it.maraschi.testapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import it.maraschi.testapp.domain.enumeration.CallState;
/**
 * Integration tests for the {@Link CallResource} REST controller.
 */
@SpringBootTest(classes = JhtestappApp.class)
public class CallResourceIT {

    private static final LocalDate DEFAULT_DATE_CALL = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CALL = LocalDate.now(ZoneId.systemDefault());

    private static final CallState DEFAULT_STATE_CALL = CallState.NEW;
    private static final CallState UPDATED_STATE_CALL = CallState.WAITING;

    @Autowired
    private CallRepository callRepository;

    @Autowired
    private CallMapper callMapper;

    @Autowired
    private CallService callService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCallMockMvc;

    private Call call;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CallResource callResource = new CallResource(callService);
        this.restCallMockMvc = MockMvcBuilders.standaloneSetup(callResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Call createEntity(EntityManager em) {
        Call call = new Call()
            .dateCall(DEFAULT_DATE_CALL)
            .stateCall(DEFAULT_STATE_CALL);
        return call;
    }

    @BeforeEach
    public void initTest() {
        call = createEntity(em);
    }

    @Test
    @Transactional
    public void createCall() throws Exception {
        int databaseSizeBeforeCreate = callRepository.findAll().size();

        // Create the Call
        CallDTO callDTO = callMapper.toDto(call);
        restCallMockMvc.perform(post("/api/calls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callDTO)))
            .andExpect(status().isCreated());

        // Validate the Call in the database
        List<Call> callList = callRepository.findAll();
        assertThat(callList).hasSize(databaseSizeBeforeCreate + 1);
        Call testCall = callList.get(callList.size() - 1);
        assertThat(testCall.getDateCall()).isEqualTo(DEFAULT_DATE_CALL);
        assertThat(testCall.getStateCall()).isEqualTo(DEFAULT_STATE_CALL);
    }

    @Test
    @Transactional
    public void createCallWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = callRepository.findAll().size();

        // Create the Call with an existing ID
        call.setId(1L);
        CallDTO callDTO = callMapper.toDto(call);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCallMockMvc.perform(post("/api/calls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Call in the database
        List<Call> callList = callRepository.findAll();
        assertThat(callList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCalls() throws Exception {
        // Initialize the database
        callRepository.saveAndFlush(call);

        // Get all the callList
        restCallMockMvc.perform(get("/api/calls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(call.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateCall").value(hasItem(DEFAULT_DATE_CALL.toString())))
            .andExpect(jsonPath("$.[*].stateCall").value(hasItem(DEFAULT_STATE_CALL.toString())));
    }
    
    @Test
    @Transactional
    public void getCall() throws Exception {
        // Initialize the database
        callRepository.saveAndFlush(call);

        // Get the call
        restCallMockMvc.perform(get("/api/calls/{id}", call.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(call.getId().intValue()))
            .andExpect(jsonPath("$.dateCall").value(DEFAULT_DATE_CALL.toString()))
            .andExpect(jsonPath("$.stateCall").value(DEFAULT_STATE_CALL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCall() throws Exception {
        // Get the call
        restCallMockMvc.perform(get("/api/calls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCall() throws Exception {
        // Initialize the database
        callRepository.saveAndFlush(call);

        int databaseSizeBeforeUpdate = callRepository.findAll().size();

        // Update the call
        Call updatedCall = callRepository.findById(call.getId()).get();
        // Disconnect from session so that the updates on updatedCall are not directly saved in db
        em.detach(updatedCall);
        updatedCall
            .dateCall(UPDATED_DATE_CALL)
            .stateCall(UPDATED_STATE_CALL);
        CallDTO callDTO = callMapper.toDto(updatedCall);

        restCallMockMvc.perform(put("/api/calls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callDTO)))
            .andExpect(status().isOk());

        // Validate the Call in the database
        List<Call> callList = callRepository.findAll();
        assertThat(callList).hasSize(databaseSizeBeforeUpdate);
        Call testCall = callList.get(callList.size() - 1);
        assertThat(testCall.getDateCall()).isEqualTo(UPDATED_DATE_CALL);
        assertThat(testCall.getStateCall()).isEqualTo(UPDATED_STATE_CALL);
    }

    @Test
    @Transactional
    public void updateNonExistingCall() throws Exception {
        int databaseSizeBeforeUpdate = callRepository.findAll().size();

        // Create the Call
        CallDTO callDTO = callMapper.toDto(call);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCallMockMvc.perform(put("/api/calls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Call in the database
        List<Call> callList = callRepository.findAll();
        assertThat(callList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCall() throws Exception {
        // Initialize the database
        callRepository.saveAndFlush(call);

        int databaseSizeBeforeDelete = callRepository.findAll().size();

        // Delete the call
        restCallMockMvc.perform(delete("/api/calls/{id}", call.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Call> callList = callRepository.findAll();
        assertThat(callList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Call.class);
        Call call1 = new Call();
        call1.setId(1L);
        Call call2 = new Call();
        call2.setId(call1.getId());
        assertThat(call1).isEqualTo(call2);
        call2.setId(2L);
        assertThat(call1).isNotEqualTo(call2);
        call1.setId(null);
        assertThat(call1).isNotEqualTo(call2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CallDTO.class);
        CallDTO callDTO1 = new CallDTO();
        callDTO1.setId(1L);
        CallDTO callDTO2 = new CallDTO();
        assertThat(callDTO1).isNotEqualTo(callDTO2);
        callDTO2.setId(callDTO1.getId());
        assertThat(callDTO1).isEqualTo(callDTO2);
        callDTO2.setId(2L);
        assertThat(callDTO1).isNotEqualTo(callDTO2);
        callDTO1.setId(null);
        assertThat(callDTO1).isNotEqualTo(callDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(callMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(callMapper.fromId(null)).isNull();
    }
}
