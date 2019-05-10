package it.maraschi.testapp.service.mapper;

import it.maraschi.testapp.domain.*;
import it.maraschi.testapp.service.dto.CallHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CallHistory} and its DTO {@link CallHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {CallMapper.class})
public interface CallHistoryMapper extends EntityMapper<CallHistoryDTO, CallHistory> {

    @Mapping(source = "call.id", target = "callId")
    CallHistoryDTO toDto(CallHistory callHistory);

    @Mapping(source = "callId", target = "call")
    CallHistory toEntity(CallHistoryDTO callHistoryDTO);

    default CallHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        CallHistory callHistory = new CallHistory();
        callHistory.setId(id);
        return callHistory;
    }
}
