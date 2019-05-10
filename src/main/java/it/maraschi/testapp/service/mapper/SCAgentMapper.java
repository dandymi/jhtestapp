package it.maraschi.testapp.service.mapper;

import it.maraschi.testapp.domain.*;
import it.maraschi.testapp.service.dto.SCAgentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SCAgent} and its DTO {@link SCAgentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SCAgentMapper extends EntityMapper<SCAgentDTO, SCAgent> {


    @Mapping(target = "clients", ignore = true)
    SCAgent toEntity(SCAgentDTO sCAgentDTO);

    default SCAgent fromId(Long id) {
        if (id == null) {
            return null;
        }
        SCAgent sCAgent = new SCAgent();
        sCAgent.setId(id);
        return sCAgent;
    }
}
