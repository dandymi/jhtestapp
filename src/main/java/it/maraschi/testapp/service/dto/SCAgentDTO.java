package it.maraschi.testapp.service.dto;
import io.swagger.annotations.ApiModel;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link it.maraschi.testapp.domain.SCAgent} entity.
 */
@ApiModel(description = "Sixth Continent Agent entity. @author DM")
public class SCAgentDTO implements Serializable {

    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String mobilePhone;

    @NotNull
    private String email;

    private String scCodeCitizen;

    private String iban;

    private LocalDate expireDateSContract;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getScCodeCitizen() {
        return scCodeCitizen;
    }

    public void setScCodeCitizen(String scCodeCitizen) {
        this.scCodeCitizen = scCodeCitizen;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public LocalDate getExpireDateSContract() {
        return expireDateSContract;
    }

    public void setExpireDateSContract(LocalDate expireDateSContract) {
        this.expireDateSContract = expireDateSContract;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SCAgentDTO sCAgentDTO = (SCAgentDTO) o;
        if (sCAgentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sCAgentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SCAgentDTO{" +
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
