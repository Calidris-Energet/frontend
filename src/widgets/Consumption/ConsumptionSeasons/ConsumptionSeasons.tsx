import { Stack } from "@mui/material";
import { updateConsumptionSeasons } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { getConsumptionSeasons } from "entities/Configurator/model/selectors/getConsumption.ts";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConsumptionSeasons = () => {
    const consumption = useAppSelector(getConsumptionSeasons);

    const dispatch = useAppDispatch();

    return (
        <Stack p={3} gap={5}>
            <ConsumptionPowerInput
                label="Зима"
                value={consumption[0]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionSeasons({ value: newValue, index: 0 })
                    );
                }}
            />
            <ConsumptionPowerInput
                label="Весна"
                value={consumption[2]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionSeasons({ value: newValue, index: 1 })
                    );
                }}
            />
            <ConsumptionPowerInput
                label="Лето"
                value={consumption[1]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionSeasons({ value: newValue, index: 2 })
                    );
                }}
            />
            <ConsumptionPowerInput
                label="Осень"
                value={consumption[3]}
                setPower={(newValue) => {
                    dispatch(
                        updateConsumptionSeasons({ value: newValue, index: 3 })
                    );
                }}
            />
        </Stack>
    );
};
