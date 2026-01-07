import { Stack } from "@mui/material";
import { updateConsumptionWinterSummer } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { getConsumptionWinterSummer } from "entities/Configurator/model/selectors/getConsumption.ts";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConsumptionWinterSummer = () => {
    const consumption = useAppSelector(getConsumptionWinterSummer);

    const dispatch = useAppDispatch();

    return (
        <Stack p={3} gap={5}>
            <ConsumptionPowerInput
                label="Зима"
                value={consumption[0]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionWinterSummer({
                            value: newValue,
                            index: 0,
                        })
                    );
                }}
            />
            <ConsumptionPowerInput
                label="Лето"
                value={consumption[1]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionWinterSummer({
                            value: newValue,
                            index: 1,
                        })
                    );
                }}
            />
        </Stack>
    );
};
