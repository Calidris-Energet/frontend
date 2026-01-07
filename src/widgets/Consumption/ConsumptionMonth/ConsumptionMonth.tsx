import { Stack } from "@mui/material";
import { updateConsumptionMonth } from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { getConsumptionMonth } from "entities/Configurator/model/selectors/getConsumption.ts";
import { ConsumptionPowerInput } from "shared/ConsumptionPowerInput/ConsumptionPowerInput.tsx";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const ConsumptionMonth = () => {
    const consumption = useAppSelector(getConsumptionMonth);
    const dispatch = useAppDispatch();

    return (
        <Stack gap={3} p={3}>
            {consumption.map((value, index) => (
                <ConsumptionPowerInput
                    value={value}
                    label={"Месяц №" + (index + 1)}
                    setPower={(newValue) => {
                        dispatch(
                            updateConsumptionMonth({ value: newValue, index })
                        );
                    }}
                    key={index}
                />
            ))}
        </Stack>
    );
};
