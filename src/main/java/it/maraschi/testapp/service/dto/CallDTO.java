package it.maraschi.testapp.service.dto;
import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import it.maraschi.testapp.domain.enumeration.CallState;

/**
 * A DTO for the {@link it.maraschi.testapp.domain.Call} entity.
 */
@ApiModel(description = "Call entity. @author DM")
public class CallDTO implements Serializable {

    private Long id;

    private LocalDate dateCall;

    private CallState stateCall;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCall() {
        return dateCall;
    }

    public void setDateCall(LocalDate dateCall) {
        this.dateCall = dateCall;
    }

    public CallState getStateCall() {
        return stateCall;
    }

    public void setStateCall(CallState stateCall) {
        this.stateCall = stateCall;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CallDTO callDTO = (CallDTO) o;
        if (callDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), callDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CallDTO{" +
            "id=" + getId() +
            ", dateCall='" + getDateCall() + "'" +
            ", stateCall='" + getStateCall() + "'" +
            "}";
    }
}
