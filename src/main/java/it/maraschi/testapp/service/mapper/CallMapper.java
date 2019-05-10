package it.maraschi.testapp.service.mapper;

import it.maraschi.testapp.domain.*;
import it.maraschi.testapp.service.dto.CallDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Call} and its DTO {@link CallDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CallMapper extends EntityMapper<CallDTO, Call> {


    @Mapping(target = "histories", ignore = true)
    Call toEntity(CallDTO callDTO);

    default Call fromId(Long id) {
        if (id == null) {
            return null;
        }
        Call call = new Call();
        call.setId(id);
        return call;
    }
}
