package it.maraschi.testapp.service.dto;
import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import it.maraschi.testapp.domain.enumeration.ClientState;

/**
 * A DTO for the {@link it.maraschi.testapp.domain.Client} entity.
 */
@ApiModel(description = "Client entity. @author DM")
public class ClientDTO implements Serializable {

    private Long id;

    @NotNull
    private String denomination;

    @NotNull
    private String vatCode;

    @NotNull
    private String webSite;

    private String notes;

    private LocalDate dateAdded;

    private LocalDate dateExpire;

    private ClientState state;

    private LocalDate dateState;

    private String notesState;


    private Long sCAgentId;

    private Long callId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDenomination() {
        return denomination;
    }

    public void setDenomination(String denomination) {
        this.denomination = denomination;
    }

    public String getVatCode() {
        return vatCode;
    }

    public void setVatCode(String vatCode) {
        this.vatCode = vatCode;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }

    public LocalDate getDateExpire() {
        return dateExpire;
    }

    public void setDateExpire(LocalDate dateExpire) {
        this.dateExpire = dateExpire;
    }

    public ClientState getState() {
        return state;
    }

    public void setState(ClientState state) {
        this.state = state;
    }

    public LocalDate getDateState() {
        return dateState;
    }

    public void setDateState(LocalDate dateState) {
        this.dateState = dateState;
    }

    public String getNotesState() {
        return notesState;
    }

    public void setNotesState(String notesState) {
        this.notesState = notesState;
    }

    public Long getSCAgentId() {
        return sCAgentId;
    }

    public void setSCAgentId(Long sCAgentId) {
        this.sCAgentId = sCAgentId;
    }

    public Long getCallId() {
        return callId;
    }

    public void setCallId(Long callId) {
        this.callId = callId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientDTO clientDTO = (ClientDTO) o;
        if (clientDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientDTO{" +
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
            ", sCAgent=" + getSCAgentId() +
            ", call=" + getCallId() +
            "}";
    }
}
