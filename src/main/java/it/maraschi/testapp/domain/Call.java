package it.maraschi.testapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import it.maraschi.testapp.domain.enumeration.CallState;

/**
 * Call entity.
 * @author DM
 */
@Entity
@Table(name = "call")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Call implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_call")
    private LocalDate dateCall;

    @Enumerated(EnumType.STRING)
    @Column(name = "state_call")
    private CallState stateCall;

    @OneToMany(mappedBy = "call")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CallHistory> histories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCall() {
        return dateCall;
    }

    public Call dateCall(LocalDate dateCall) {
        this.dateCall = dateCall;
        return this;
    }

    public void setDateCall(LocalDate dateCall) {
        this.dateCall = dateCall;
    }

    public CallState getStateCall() {
        return stateCall;
    }

    public Call stateCall(CallState stateCall) {
        this.stateCall = stateCall;
        return this;
    }

    public void setStateCall(CallState stateCall) {
        this.stateCall = stateCall;
    }

    public Set<CallHistory> getHistories() {
        return histories;
    }

    public Call histories(Set<CallHistory> callHistories) {
        this.histories = callHistories;
        return this;
    }

    public Call addHistory(CallHistory callHistory) {
        this.histories.add(callHistory);
        callHistory.setCall(this);
        return this;
    }

    public Call removeHistory(CallHistory callHistory) {
        this.histories.remove(callHistory);
        callHistory.setCall(null);
        return this;
    }

    public void setHistories(Set<CallHistory> callHistories) {
        this.histories = callHistories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Call)) {
            return false;
        }
        return id != null && id.equals(((Call) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Call{" +
            "id=" + getId() +
            ", dateCall='" + getDateCall() + "'" +
            ", stateCall='" + getStateCall() + "'" +
            "}";
    }
}
