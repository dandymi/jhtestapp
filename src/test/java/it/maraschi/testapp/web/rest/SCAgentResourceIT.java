package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.JhtestappApp;
import it.maraschi.testapp.domain.SCAgent;
import it.maraschi.testapp.repository.SCAgentRepository;
import it.maraschi.testapp.service.SCAgentService;
import it.maraschi.testapp.service.dto.SCAgentDTO;
import it.maraschi.testapp.service.mapper.SCAgentMapper;
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

/**
 * Integration tests for the {@Link SCAgentResource} REST controller.
 */
@SpringBootTest(classes = JhtestappApp.class)
public class SCAgentResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SC_CODE_CITIZEN = "AAAAAAAAAA";
    private static final String UPDATED_SC_CODE_CITIZEN = "BBBBBBBBBB";

    private static final String DEFAULT_IBAN = "AAAAAAAAAA";
    private static final String UPDATED_IBAN = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EXPIRE_DATE_S_CONTRACT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRE_DATE_S_CONTRACT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SCAgentRepository sCAgentRepository;

    @Autowired
    private SCAgentMapper sCAgentMapper;

    @Autowired
    private SCAgentService sCAgentService;

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

    private MockMvc restSCAgentMockMvc;

    private SCAgent sCAgent;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SCAgentResource sCAgentResource = new SCAgentResource(sCAgentService);
        this.restSCAgentMockMvc = MockMvcBuilders.standaloneSetup(sCAgentResource)
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
    public static SCAgent createEntity(EntityManager em) {
        SCAgent sCAgent = new SCAgent()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .mobilePhone(DEFAULT_MOBILE_PHONE)
            .email(DEFAULT_EMAIL)
            .scCodeCitizen(DEFAULT_SC_CODE_CITIZEN)
            .iban(DEFAULT_IBAN)
            .expireDateSContract(DEFAULT_EXPIRE_DATE_S_CONTRACT);
        return sCAgent;
    }

    @BeforeEach
    public void initTest() {
        sCAgent = createEntity(em);
    }

    @Test
    @Transactional
    public void createSCAgent() throws Exception {
        int databaseSizeBeforeCreate = sCAgentRepository.findAll().size();

        // Create the SCAgent
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);
        restSCAgentMockMvc.perform(post("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isCreated());

        // Validate the SCAgent in the database
        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeCreate + 1);
        SCAgent testSCAgent = sCAgentList.get(sCAgentList.size() - 1);
        assertThat(testSCAgent.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testSCAgent.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testSCAgent.getMobilePhone()).isEqualTo(DEFAULT_MOBILE_PHONE);
        assertThat(testSCAgent.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSCAgent.getScCodeCitizen()).isEqualTo(DEFAULT_SC_CODE_CITIZEN);
        assertThat(testSCAgent.getIban()).isEqualTo(DEFAULT_IBAN);
        assertThat(testSCAgent.getExpireDateSContract()).isEqualTo(DEFAULT_EXPIRE_DATE_S_CONTRACT);
    }

    @Test
    @Transactional
    public void createSCAgentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sCAgentRepository.findAll().size();

        // Create the SCAgent with an existing ID
        sCAgent.setId(1L);
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSCAgentMockMvc.perform(post("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SCAgent in the database
        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sCAgentRepository.findAll().size();
        // set the field null
        sCAgent.setFirstName(null);

        // Create the SCAgent, which fails.
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);

        restSCAgentMockMvc.perform(post("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isBadRequest());

        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sCAgentRepository.findAll().size();
        // set the field null
        sCAgent.setLastName(null);

        // Create the SCAgent, which fails.
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);

        restSCAgentMockMvc.perform(post("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isBadRequest());

        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = sCAgentRepository.findAll().size();
        // set the field null
        sCAgent.setEmail(null);

        // Create the SCAgent, which fails.
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);

        restSCAgentMockMvc.perform(post("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isBadRequest());

        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSCAgents() throws Exception {
        // Initialize the database
        sCAgentRepository.saveAndFlush(sCAgent);

        // Get all the sCAgentList
        restSCAgentMockMvc.perform(get("/api/sc-agents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sCAgent.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].mobilePhone").value(hasItem(DEFAULT_MOBILE_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].scCodeCitizen").value(hasItem(DEFAULT_SC_CODE_CITIZEN.toString())))
            .andExpect(jsonPath("$.[*].iban").value(hasItem(DEFAULT_IBAN.toString())))
            .andExpect(jsonPath("$.[*].expireDateSContract").value(hasItem(DEFAULT_EXPIRE_DATE_S_CONTRACT.toString())));
    }
    
    @Test
    @Transactional
    public void getSCAgent() throws Exception {
        // Initialize the database
        sCAgentRepository.saveAndFlush(sCAgent);

        // Get the sCAgent
        restSCAgentMockMvc.perform(get("/api/sc-agents/{id}", sCAgent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sCAgent.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.mobilePhone").value(DEFAULT_MOBILE_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.scCodeCitizen").value(DEFAULT_SC_CODE_CITIZEN.toString()))
            .andExpect(jsonPath("$.iban").value(DEFAULT_IBAN.toString()))
            .andExpect(jsonPath("$.expireDateSContract").value(DEFAULT_EXPIRE_DATE_S_CONTRACT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSCAgent() throws Exception {
        // Get the sCAgent
        restSCAgentMockMvc.perform(get("/api/sc-agents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSCAgent() throws Exception {
        // Initialize the database
        sCAgentRepository.saveAndFlush(sCAgent);

        int databaseSizeBeforeUpdate = sCAgentRepository.findAll().size();

        // Update the sCAgent
        SCAgent updatedSCAgent = sCAgentRepository.findById(sCAgent.getId()).get();
        // Disconnect from session so that the updates on updatedSCAgent are not directly saved in db
        em.detach(updatedSCAgent);
        updatedSCAgent
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .mobilePhone(UPDATED_MOBILE_PHONE)
            .email(UPDATED_EMAIL)
            .scCodeCitizen(UPDATED_SC_CODE_CITIZEN)
            .iban(UPDATED_IBAN)
            .expireDateSContract(UPDATED_EXPIRE_DATE_S_CONTRACT);
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(updatedSCAgent);

        restSCAgentMockMvc.perform(put("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isOk());

        // Validate the SCAgent in the database
        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeUpdate);
        SCAgent testSCAgent = sCAgentList.get(sCAgentList.size() - 1);
        assertThat(testSCAgent.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testSCAgent.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testSCAgent.getMobilePhone()).isEqualTo(UPDATED_MOBILE_PHONE);
        assertThat(testSCAgent.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSCAgent.getScCodeCitizen()).isEqualTo(UPDATED_SC_CODE_CITIZEN);
        assertThat(testSCAgent.getIban()).isEqualTo(UPDATED_IBAN);
        assertThat(testSCAgent.getExpireDateSContract()).isEqualTo(UPDATED_EXPIRE_DATE_S_CONTRACT);
    }

    @Test
    @Transactional
    public void updateNonExistingSCAgent() throws Exception {
        int databaseSizeBeforeUpdate = sCAgentRepository.findAll().size();

        // Create the SCAgent
        SCAgentDTO sCAgentDTO = sCAgentMapper.toDto(sCAgent);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSCAgentMockMvc.perform(put("/api/sc-agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sCAgentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SCAgent in the database
        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSCAgent() throws Exception {
        // Initialize the database
        sCAgentRepository.saveAndFlush(sCAgent);

        int databaseSizeBeforeDelete = sCAgentRepository.findAll().size();

        // Delete the sCAgent
        restSCAgentMockMvc.perform(delete("/api/sc-agents/{id}", sCAgent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SCAgent> sCAgentList = sCAgentRepository.findAll();
        assertThat(sCAgentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SCAgent.class);
        SCAgent sCAgent1 = new SCAgent();
        sCAgent1.setId(1L);
        SCAgent sCAgent2 = new SCAgent();
        sCAgent2.setId(sCAgent1.getId());
        assertThat(sCAgent1).isEqualTo(sCAgent2);
        sCAgent2.setId(2L);
        assertThat(sCAgent1).isNotEqualTo(sCAgent2);
        sCAgent1.setId(null);
        assertThat(sCAgent1).isNotEqualTo(sCAgent2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SCAgentDTO.class);
        SCAgentDTO sCAgentDTO1 = new SCAgentDTO();
        sCAgentDTO1.setId(1L);
        SCAgentDTO sCAgentDTO2 = new SCAgentDTO();
        assertThat(sCAgentDTO1).isNotEqualTo(sCAgentDTO2);
        sCAgentDTO2.setId(sCAgentDTO1.getId());
        assertThat(sCAgentDTO1).isEqualTo(sCAgentDTO2);
        sCAgentDTO2.setId(2L);
        assertThat(sCAgentDTO1).isNotEqualTo(sCAgentDTO2);
        sCAgentDTO1.setId(null);
        assertThat(sCAgentDTO1).isNotEqualTo(sCAgentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sCAgentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sCAgentMapper.fromId(null)).isNull();
    }
}
