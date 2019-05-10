package it.maraschi.testapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import it.maraschi.testapp.domain.enumeration.ClientState;

/**
 * Client entity.
 * @author DM
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "denomination", nullable = false)
    private String denomination;

    @NotNull
    @Column(name = "vat_code", nullable = false)
    private String vatCode;

    @NotNull
    @Column(name = "web_site", nullable = false)
    private String webSite;

    @Column(name = "notes")
    private String notes;

    @Column(name = "date_added")
    private LocalDate dateAdded;

    @Column(name = "date_expire")
    private LocalDate dateExpire;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private ClientState state;

    @Column(name = "date_state")
    private LocalDate dateState;

    @Column(name = "notes_state")
    private String notesState;

    @ManyToOne
    @JsonIgnoreProperties("clients")
    private SCAgent sCAgent;

    @OneToOne
    @JoinColumn(unique = true)
    private Call call;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDenomination() {
        return denomination;
    }

    public Client denomination(String denomination) {
        this.denomination = denomination;
        return this;
    }

    public void setDenomination(String denomination) {
        this.denomination = denomination;
    }

    public String getVatCode() {
        return vatCode;
    }

    public Client vatCode(String vatCode) {
        this.vatCode = vatCode;
        return this;
    }

    public void setVatCode(String vatCode) {
        this.vatCode = vatCode;
    }

    public String getWebSite() {
        return webSite;
    }

    public Client webSite(String webSite) {
        this.webSite = webSite;
        return this;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getNotes() {
        return notes;
    }

    public Client notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public Client dateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
        return this;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public LocalDate getDateExpire() {
        return dateExpire;
    }

    public Client dateExpire(LocalDate dateExpire) {
        this.dateExpire = dateExpire;
        return this;
    }

    public void setDateExpire(LocalDate dateExpire) {
        this.dateExpire = dateExpire;
    }

    public ClientState getState() {
        return state;
    }

    public Client state(ClientState state) {
        this.state = state;
        return this;
    }

    public void setState(ClientState state) {
        this.state = state;
    }

    public LocalDate getDateState() {
        return dateState;
    }

    public Client dateState(LocalDate dateState) {
        this.dateState = dateState;
        return this;
    }

    public void setDateState(LocalDate dateState) {
        this.dateState = dateState;
    }

    public String getNotesState() {
        return notesState;
    }

    public Client notesState(String notesState) {
        this.notesState = notesState;
        return this;
    }

    public void setNotesState(String notesState) {
        this.notesState = notesState;
    }

    public SCAgent getSCAgent() {
        return sCAgent;
    }

    public Client sCAgent(SCAgent sCAgent) {
        this.sCAgent = sCAgent;
        return this;
    }

    public void setSCAgent(SCAgent sCAgent) {
        this.sCAgent = sCAgent;
    }

    public Call getCall() {
        return call;
    }

    public Client call(Call call) {
        this.call = call;
        return this;
    }

    public void setCall(Call call) {
        this.call = call;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", denomination='" + getDenomination() + "'" +
            ", vatCode='" + getVatCode() + "'" +
            ", webSite='" + getWebSite() + "'" +
            ", notes='" + getNotes() + "'" +
            ", dateAdded='" + getDateAdded() + "'" +
            ", dateExpire='" + getDateExpire() + "'" +
            ", state='" + getState() + "'" +
            ", dateState='" + getDateState() + "'" +
            ", notesState='" + getNotesState() + "'" +
            "}";
    }
}
