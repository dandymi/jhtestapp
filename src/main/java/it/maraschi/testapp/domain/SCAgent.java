package it.maraschi.testapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Sixth Continent Agent entity.
 * @author DM
 */
@Entity
@Table(name = "sc_agent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SCAgent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "sc_code_citizen")
    private String scCodeCitizen;

    @Column(name = "iban")
    private String iban;

    @Column(name = "expire_date_s_contract")
    private LocalDate expireDateSContract;

    @OneToMany(mappedBy = "sCAgent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public SCAgent firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public SCAgent lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public SCAgent mobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
        return this;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEmail() {
        return email;
    }

    public SCAgent email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getScCodeCitizen() {
        return scCodeCitizen;
    }

    public SCAgent scCodeCitizen(String scCodeCitizen) {
        this.scCodeCitizen = scCodeCitizen;
        return this;
    }

    public void setScCodeCitizen(String scCodeCitizen) {
        this.scCodeCitizen = scCodeCitizen;
    }

    public String getIban() {
        return iban;
    }

    public SCAgent iban(String iban) {
        this.iban = iban;
        return this;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public LocalDate getExpireDateSContract() {
        return expireDateSContract;
    }

    public SCAgent expireDateSContract(LocalDate expireDateSContract) {
        this.expireDateSContract = expireDateSContract;
        return this;
    }

    public void setExpireDateSContract(LocalDate expireDateSContract) {
        this.expireDateSContract = expireDateSContract;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public SCAgent clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public SCAgent addClient(Client client) {
        this.clients.add(client);
        client.setSCAgent(this);
        return this;
    }

    public SCAgent removeClient(Client client) {
        this.clients.remove(client);
        client.setSCAgent(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SCAgent)) {
            return false;
        }
        return id != null && id.equals(((SCAgent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SCAgent{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", mobilePhone='" + getMobilePhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", scCodeCitizen='" + getScCodeCitizen() + "'" +
            ", iban='" + getIban() + "'" +
            ", expireDateSContract='" + getExpireDateSContract() + "'" +
            "}";
    }
}
