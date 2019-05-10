package it.maraschi.testapp.service.dto;
import io.swagger.annotations.ApiModel;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import it.maraschi.testapp.domain.enumeration.ClientAction;

/**
 * A DTO for the {@link it.maraschi.testapp.domain.CallHistory} entity.
 */
@ApiModel(description = "Call History entity. @author DM")
public class CallHistoryDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant startDate;

    private Instant endDate;

    private ClientAction action;


    private Long callId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public ClientAction getAction() {
        return action;
    }

    public void setAction(ClientAction action) {
        this.action = action;
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

        CallHistoryDTO callHistoryDTO = (CallHistoryDTO) o;
        if (callHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), callHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CallHistoryDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", action='" + getAction() + "'" +
            ", call=" + getCallId() +
            "}";
    }
}
