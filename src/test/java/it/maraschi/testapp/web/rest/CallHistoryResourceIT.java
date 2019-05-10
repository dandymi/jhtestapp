package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.JhtestappApp;
import it.maraschi.testapp.domain.CallHistory;
import it.maraschi.testapp.repository.CallHistoryRepository;
import it.maraschi.testapp.service.CallHistoryService;
import it.maraschi.testapp.service.dto.CallHistoryDTO;
import it.maraschi.testapp.service.mapper.CallHistoryMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static it.maraschi.testapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import it.maraschi.testapp.domain.enumeration.ClientAction;
/**
 * Integration tests for the {@Link CallHistoryResource} REST controller.
 */
@SpringBootTest(classes = JhtestappApp.class)
public class CallHistoryResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ClientAction DEFAULT_ACTION = ClientAction.FIRST_MAIL;
    private static final ClientAction UPDATED_ACTION = ClientAction.SECOND_MAIL;

    @Autowired
    private CallHistoryRepository callHistoryRepository;

    @Autowired
    private CallHistoryMapper callHistoryMapper;

    @Autowired
    private CallHistoryService callHistoryService;

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

    private MockMvc restCallHistoryMockMvc;

    private CallHistory callHistory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CallHistoryResource callHistoryResource = new CallHistoryResource(callHistoryService);
        this.restCallHistoryMockMvc = MockMvcBuilders.standaloneSetup(callHistoryResource)
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
    public static CallHistory createEntity(EntityManager em) {
        CallHistory callHistory = new CallHistory()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .action(DEFAULT_ACTION);
        return callHistory;
    }

    @BeforeEach
    public void initTest() {
        callHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createCallHistory() throws Exception {
        int databaseSizeBeforeCreate = callHistoryRepository.findAll().size();

        // Create the CallHistory
        CallHistoryDTO callHistoryDTO = callHistoryMapper.toDto(callHistory);
        restCallHistoryMockMvc.perform(post("/api/call-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the CallHistory in the database
        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        CallHistory testCallHistory = callHistoryList.get(callHistoryList.size() - 1);
        assertThat(testCallHistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCallHistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testCallHistory.getAction()).isEqualTo(DEFAULT_ACTION);
    }

    @Test
    @Transactional
    public void createCallHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = callHistoryRepository.findAll().size();

        // Create the CallHistory with an existing ID
        callHistory.setId(1L);
        CallHistoryDTO callHistoryDTO = callHistoryMapper.toDto(callHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCallHistoryMockMvc.perform(post("/api/call-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CallHistory in the database
        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = callHistoryRepository.findAll().size();
        // set the field null
        callHistory.setStartDate(null);

        // Create the CallHistory, which fails.
        CallHistoryDTO callHistoryDTO = callHistoryMapper.toDto(callHistory);

        restCallHistoryMockMvc.perform(post("/api/call-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callHistoryDTO)))
            .andExpect(status().isBadRequest());

        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCallHistories() throws Exception {
        // Initialize the database
        callHistoryRepository.saveAndFlush(callHistory);

        // Get all the callHistoryList
        restCallHistoryMockMvc.perform(get("/api/call-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(callHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())));
    }
    
    @Test
    @Transactional
    public void getCallHistory() throws Exception {
        // Initialize the database
        callHistoryRepository.saveAndFlush(callHistory);

        // Get the callHistory
        restCallHistoryMockMvc.perform(get("/api/call-histories/{id}", callHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(callHistory.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCallHistory() throws Exception {
        // Get the callHistory
        restCallHistoryMockMvc.perform(get("/api/call-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCallHistory() throws Exception {
        // Initialize the database
        callHistoryRepository.saveAndFlush(callHistory);

        int databaseSizeBeforeUpdate = callHistoryRepository.findAll().size();

        // Update the callHistory
        CallHistory updatedCallHistory = callHistoryRepository.findById(callHistory.getId()).get();
        // Disconnect from session so that the updates on updatedCallHistory are not directly saved in db
        em.detach(updatedCallHistory);
        updatedCallHistory
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .action(UPDATED_ACTION);
        CallHistoryDTO callHistoryDTO = callHistoryMapper.toDto(updatedCallHistory);

        restCallHistoryMockMvc.perform(put("/api/call-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the CallHistory in the database
        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeUpdate);
        CallHistory testCallHistory = callHistoryList.get(callHistoryList.size() - 1);
        assertThat(testCallHistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCallHistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testCallHistory.getAction()).isEqualTo(UPDATED_ACTION);
    }

    @Test
    @Transactional
    public void updateNonExistingCallHistory() throws Exception {
        int databaseSizeBeforeUpdate = callHistoryRepository.findAll().size();

        // Create the CallHistory
        CallHistoryDTO callHistoryDTO = callHistoryMapper.toDto(callHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCallHistoryMockMvc.perform(put("/api/call-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(callHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CallHistory in the database
        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCallHistory() throws Exception {
        // Initialize the database
        callHistoryRepository.saveAndFlush(callHistory);

        int databaseSizeBeforeDelete = callHistoryRepository.findAll().size();

        // Delete the callHistory
        restCallHistoryMockMvc.perform(delete("/api/call-histories/{id}", callHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<CallHistory> callHistoryList = callHistoryRepository.findAll();
        assertThat(callHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CallHistory.class);
        CallHistory callHistory1 = new CallHistory();
        callHistory1.setId(1L);
        CallHistory callHistory2 = new CallHistory();
        callHistory2.setId(callHistory1.getId());
        assertThat(callHistory1).isEqualTo(callHistory2);
        callHistory2.setId(2L);
        assertThat(callHistory1).isNotEqualTo(callHistory2);
        callHistory1.setId(null);
        assertThat(callHistory1).isNotEqualTo(callHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CallHistoryDTO.class);
        CallHistoryDTO callHistoryDTO1 = new CallHistoryDTO();
        callHistoryDTO1.setId(1L);
        CallHistoryDTO callHistoryDTO2 = new CallHistoryDTO();
        assertThat(callHistoryDTO1).isNotEqualTo(callHistoryDTO2);
        callHistoryDTO2.setId(callHistoryDTO1.getId());
        assertThat(callHistoryDTO1).isEqualTo(callHistoryDTO2);
        callHistoryDTO2.setId(2L);
        assertThat(callHistoryDTO1).isNotEqualTo(callHistoryDTO2);
        callHistoryDTO1.setId(null);
        assertThat(callHistoryDTO1).isNotEqualTo(callHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(callHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(callHistoryMapper.fromId(null)).isNull();
    }
}
