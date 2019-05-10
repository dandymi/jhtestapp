package it.maraschi.testapp.web.rest;

import it.maraschi.testapp.JhtestappApp;
import it.maraschi.testapp.domain.Client;
import it.maraschi.testapp.repository.ClientRepository;
import it.maraschi.testapp.service.ClientService;
import it.maraschi.testapp.service.dto.ClientDTO;
import it.maraschi.testapp.service.mapper.ClientMapper;
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

import it.maraschi.testapp.domain.enumeration.ClientState;
/**
 * Integration tests for the {@Link ClientResource} REST controller.
 */
@SpringBootTest(classes = JhtestappApp.class)
public class ClientResourceIT {

    private static final String DEFAULT_DENOMINATION = "AAAAAAAAAA";
    private static final String UPDATED_DENOMINATION = "BBBBBBBBBB";

    private static final String DEFAULT_VAT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_VAT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_SITE = "AAAAAAAAAA";
    private static final String UPDATED_WEB_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ADDED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ADDED = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_EXPIRE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EXPIRE = LocalDate.now(ZoneId.systemDefault());

    private static final ClientState DEFAULT_STATE = ClientState.EVALUATING;
    private static final ClientState UPDATED_STATE = ClientState.APPROVED;

    private static final LocalDate DEFAULT_DATE_STATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_STATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTES_STATE = "AAAAAAAAAA";
    private static final String UPDATED_NOTES_STATE = "BBBBBBBBBB";

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private ClientService clientService;

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

    private MockMvc restClientMockMvc;

    private Client client;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientResource clientResource = new ClientResource(clientService);
        this.restClientMockMvc = MockMvcBuilders.standaloneSetup(clientResource)
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
    public static Client createEntity(EntityManager em) {
        Client client = new Client()
            .denomination(DEFAULT_DENOMINATION)
            .vatCode(DEFAULT_VAT_CODE)
            .webSite(DEFAULT_WEB_SITE)
            .notes(DEFAULT_NOTES)
            .dateAdded(DEFAULT_DATE_ADDED)
            .dateExpire(DEFAULT_DATE_EXPIRE)
            .state(DEFAULT_STATE)
            .dateState(DEFAULT_DATE_STATE)
            .notesState(DEFAULT_NOTES_STATE);
        return client;
    }

    @BeforeEach
    public void initTest() {
        client = createEntity(em);
    }

    @Test
    @Transactional
    public void createClient() throws Exception {
        int databaseSizeBeforeCreate = clientRepository.findAll().size();

        // Create the Client
        ClientDTO clientDTO = clientMapper.toDto(client);
        restClientMockMvc.perform(post("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isCreated());

        // Validate the Client in the database
        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeCreate + 1);
        Client testClient = clientList.get(clientList.size() - 1);
        assertThat(testClient.getDenomination()).isEqualTo(DEFAULT_DENOMINATION);
        assertThat(testClient.getVatCode()).isEqualTo(DEFAULT_VAT_CODE);
        assertThat(testClient.getWebSite()).isEqualTo(DEFAULT_WEB_SITE);
        assertThat(testClient.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testClient.getDateAdded()).isEqualTo(DEFAULT_DATE_ADDED);
        assertThat(testClient.getDateExpire()).isEqualTo(DEFAULT_DATE_EXPIRE);
        assertThat(testClient.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testClient.getDateState()).isEqualTo(DEFAULT_DATE_STATE);
        assertThat(testClient.getNotesState()).isEqualTo(DEFAULT_NOTES_STATE);
    }

    @Test
    @Transactional
    public void createClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientRepository.findAll().size();

        // Create the Client with an existing ID
        client.setId(1L);
        ClientDTO clientDTO = clientMapper.toDto(client);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientMockMvc.perform(post("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Client in the database
        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDenominationIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientRepository.findAll().size();
        // set the field null
        client.setDenomination(null);

        // Create the Client, which fails.
        ClientDTO clientDTO = clientMapper.toDto(client);

        restClientMockMvc.perform(post("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isBadRequest());

        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVatCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientRepository.findAll().size();
        // set the field null
        client.setVatCode(null);

        // Create the Client, which fails.
        ClientDTO clientDTO = clientMapper.toDto(client);

        restClientMockMvc.perform(post("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isBadRequest());

        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWebSiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = clientRepository.findAll().size();
        // set the field null
        client.setWebSite(null);

        // Create the Client, which fails.
        ClientDTO clientDTO = clientMapper.toDto(client);

        restClientMockMvc.perform(post("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isBadRequest());

        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllClients() throws Exception {
        // Initialize the database
        clientRepository.saveAndFlush(client);

        // Get all the clientList
        restClientMockMvc.perform(get("/api/clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(client.getId().intValue())))
            .andExpect(jsonPath("$.[*].denomination").value(hasItem(DEFAULT_DENOMINATION.toString())))
            .andExpect(jsonPath("$.[*].vatCode").value(hasItem(DEFAULT_VAT_CODE.toString())))
            .andExpect(jsonPath("$.[*].webSite").value(hasItem(DEFAULT_WEB_SITE.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].dateAdded").value(hasItem(DEFAULT_DATE_ADDED.toString())))
            .andExpect(jsonPath("$.[*].dateExpire").value(hasItem(DEFAULT_DATE_EXPIRE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].dateState").value(hasItem(DEFAULT_DATE_STATE.toString())))
            .andExpect(jsonPath("$.[*].notesState").value(hasItem(DEFAULT_NOTES_STATE.toString())));
    }
    
    @Test
    @Transactional
    public void getClient() throws Exception {
        // Initialize the database
        clientRepository.saveAndFlush(client);

        // Get the client
        restClientMockMvc.perform(get("/api/clients/{id}", client.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(client.getId().intValue()))
            .andExpect(jsonPath("$.denomination").value(DEFAULT_DENOMINATION.toString()))
            .andExpect(jsonPath("$.vatCode").value(DEFAULT_VAT_CODE.toString()))
            .andExpect(jsonPath("$.webSite").value(DEFAULT_WEB_SITE.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.dateAdded").value(DEFAULT_DATE_ADDED.toString()))
            .andExpect(jsonPath("$.dateExpire").value(DEFAULT_DATE_EXPIRE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.dateState").value(DEFAULT_DATE_STATE.toString()))
            .andExpect(jsonPath("$.notesState").value(DEFAULT_NOTES_STATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClient() throws Exception {
        // Get the client
        restClientMockMvc.perform(get("/api/clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClient() throws Exception {
        // Initialize the database
        clientRepository.saveAndFlush(client);

        int databaseSizeBeforeUpdate = clientRepository.findAll().size();

        // Update the client
        Client updatedClient = clientRepository.findById(client.getId()).get();
        // Disconnect from session so that the updates on updatedClient are not directly saved in db
        em.detach(updatedClient);
        updatedClient
            .denomination(UPDATED_DENOMINATION)
            .vatCode(UPDATED_VAT_CODE)
            .webSite(UPDATED_WEB_SITE)
            .notes(UPDATED_NOTES)
            .dateAdded(UPDATED_DATE_ADDED)
            .dateExpire(UPDATED_DATE_EXPIRE)
            .state(UPDATED_STATE)
            .dateState(UPDATED_DATE_STATE)
            .notesState(UPDATED_NOTES_STATE);
        ClientDTO clientDTO = clientMapper.toDto(updatedClient);

        restClientMockMvc.perform(put("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isOk());

        // Validate the Client in the database
        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeUpdate);
        Client testClient = clientList.get(clientList.size() - 1);
        assertThat(testClient.getDenomination()).isEqualTo(UPDATED_DENOMINATION);
        assertThat(testClient.getVatCode()).isEqualTo(UPDATED_VAT_CODE);
        assertThat(testClient.getWebSite()).isEqualTo(UPDATED_WEB_SITE);
        assertThat(testClient.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testClient.getDateAdded()).isEqualTo(UPDATED_DATE_ADDED);
        assertThat(testClient.getDateExpire()).isEqualTo(UPDATED_DATE_EXPIRE);
        assertThat(testClient.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testClient.getDateState()).isEqualTo(UPDATED_DATE_STATE);
        assertThat(testClient.getNotesState()).isEqualTo(UPDATED_NOTES_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingClient() throws Exception {
        int databaseSizeBeforeUpdate = clientRepository.findAll().size();

        // Create the Client
        ClientDTO clientDTO = clientMapper.toDto(client);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientMockMvc.perform(put("/api/clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Client in the database
        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClient() throws Exception {
        // Initialize the database
        clientRepository.saveAndFlush(client);

        int databaseSizeBeforeDelete = clientRepository.findAll().size();

        // Delete the client
        restClientMockMvc.perform(delete("/api/clients/{id}", client.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Client> clientList = clientRepository.findAll();
        assertThat(clientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Client.class);
        Client client1 = new Client();
        client1.setId(1L);
        Client client2 = new Client();
        client2.setId(client1.getId());
        assertThat(client1).isEqualTo(client2);
        client2.setId(2L);
        assertThat(client1).isNotEqualTo(client2);
        client1.setId(null);
        assertThat(client1).isNotEqualTo(client2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientDTO.class);
        ClientDTO clientDTO1 = new ClientDTO();
        clientDTO1.setId(1L);
        ClientDTO clientDTO2 = new ClientDTO();
        assertThat(clientDTO1).isNotEqualTo(clientDTO2);
        clientDTO2.setId(clientDTO1.getId());
        assertThat(clientDTO1).isEqualTo(clientDTO2);
        clientDTO2.setId(2L);
        assertThat(clientDTO1).isNotEqualTo(clientDTO2);
        clientDTO1.setId(null);
        assertThat(clientDTO1).isNotEqualTo(clientDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(clientMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(clientMapper.fromId(null)).isNull();
    }
}
