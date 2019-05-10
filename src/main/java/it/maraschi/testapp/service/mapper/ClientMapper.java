package it.maraschi.testapp.service.mapper;

import it.maraschi.testapp.domain.*;
import it.maraschi.testapp.service.dto.ClientDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring", uses = {SCAgentMapper.class, CallMapper.class})
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {

    @Mapping(source = "sCAgent.id", target = "sCAgentId")
    @Mapping(source = "call.id", target = "callId")
    ClientDTO toDto(Client client);

    @Mapping(source = "sCAgentId", target = "sCAgent")
    @Mapping(source = "callId", target = "call")
    Client toEntity(ClientDTO clientDTO);

    default Client fromId(Long id) {
        if (id == null) {
            return null;
        }
        Client client = new Client();
        client.setId(id);
        return client;
    }
}
