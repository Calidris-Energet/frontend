// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Step,
    StepButton,
    Stepper,
    Typography,
    IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
    calculateFetch,
    resetConfigurator,
} from "entities/Configurator/lib/slices/configuratorSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useAppDispatch,
    useAppSelector,
} from "src/app/providers/StoreProvider/hooks/hooks.ts";
import ConfiguratorResultPage from "src/widgets/ConfiguratorResultPage/ConfiguratorResultPage.tsx";
import { Consumption } from "src/widgets/Consumption/Consumption.tsx";
import { CoordsPicker } from "src/widgets/CoordsPicker/CoordsPicker.tsx";
import { Optimization } from "src/widgets/Optimization/Optimization.tsx";
import { TabPanel } from "src/widgets/TabPanel/TabPanel.tsx";
import { OnboardingDialog } from "src/shared/OnboardingDialog/OnboardingDialog.tsx";

export const ConfiguratorPage = () => {
    const steps = [
        { 
            label: "Локация", 
            onboardingContent: {
                title: "Локация",
                description: "Здесь вы можете выбрать местоположение для расчета солнечной электростанции.",
                image: "example.png",
                steps: [
                    "Выберите местоположение на карте",
                    "Укажите координаты вручную",
                    "Система автоматически определит солнечную инсоляцию"
                ]
            }
        },
        { 
            label: "Потребление", 
            onboardingContent: {
                title: "Потребление",
                description: "Настройте параметры энергопотребления вашего объекта.",
                image: "example.png",
                steps: [
                    "Укажите среднесуточное потребление",
                    "Задайте сезонные коэффициенты",
                    "Определите пиковые нагрузки"
                ]
            }
        },
        { 
            label: "Оптимизация", 
            onboardingContent: {
                title: "Оптимизация",
                description: "Настройте параметры для оптимальной работы системы.",
                image: "example.png",
                steps: [
                    "Выберите критерии оптимизации",
                    "Настройте бюджетные ограничения",
                    "Определите приоритеты системы"
                ]
            }
        },
        { 
            label: "Результат", 
            onboardingContent: {
                title: "Результат",
                description: "Просмотрите итоговую конфигурацию системы.",
                image: "example.png"
            }
        },
    ];

    const [step, setStep] = useState(0);
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);

    const { loading, items } = useAppSelector(
        (state) => state.configuratorReducer
    );

    const navigate = useNavigate();
    
    const dispatch = useAppDispatch();

    const handleStep = async (index) => {
        if (index < 0 || index > 3) {
            return;
        }

        setStep(index);

        if (index == 3) {
            await fetchConfigurator();
            setStep(3);
        }
    };

    const handleOpenNextStep = () => {
        handleStep(step + 1);
    };

    const fetchConfigurator = async () => {
        dispatch(calculateFetch());
    };

    const handleExitFromConfigurator = async () => {
        navigate("/");
        dispatch(resetConfigurator());
        setStep(0);
    };

    const handleOpenOnboarding = (stepIndex) => {
        setCurrentOnboardingStep(stepIndex);
        setOnboardingOpen(true);
    };

    const handleCloseOnboarding = () => {
        setOnboardingOpen(false);
    };

    const isLastStep = step == 3;

    if (isLastStep && !items && !loading) {
        return <></>;
    }

    if (loading) {
        return (
            <Stack
                direction="column"
                gap={5}
                sx={{ width: "100%", height: "800px" }}
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress size={48} />
                <Typography variant="h5" textAlign="center">
                    Выполняется обработка данных,
                    <br /> идет подсчет результатов
                </Typography>
            </Stack>
        );
    }

    if (!loading && items && !items.length) {
        return (
            <Stack
                direction="column"
                gap={5}
                sx={{ width: "100%", height: "800px" }}
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5" textAlign="center">
                    Подходящий комплект не найден
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExitFromConfigurator}
                >
                    Вернуться на главную
                </Button>
            </Stack>
        );
    }
    
    // const saveToDraft = async () => {
    //     navigate("/");
    //     await dispatch(saveDraftCalculation());
    //     dispatch(resetConfigurator());
    //     setStep(0);
    // };
    
    const nextStepBtnVisible = !isLastStep;

    return (
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack gap={10} width="100%">
                <Box width="100%">
                    <Stepper nonLinear activeStep={step} width="100%">
                        {steps.map((stepItem, index) => {
                            return (
                                <Step key={stepItem.label}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <StepButton
                                            onClick={() => handleStep(index)}
                                        >
                                            {stepItem.label}
                                        </StepButton>
                                        <IconButton 
                                            size="small" 
                                            sx={{ ml: 0.5 }}
                                            onClick={() => handleOpenOnboarding(index)}
                                        >
                                            <HelpOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <TabPanel currentTab={step} index={0}>
                            <CoordsPicker />
                        </TabPanel>
                        <TabPanel currentTab={step} index={1}>
                            <Consumption />
                        </TabPanel>
                        <TabPanel currentTab={step} index={2}>
                            <Optimization />
                        </TabPanel>
                        <TabPanel currentTab={step} index={3}>
                            <ConfiguratorResultPage
                                setStep={setStep}
                                items={items}
                            />
                        </TabPanel>
                    </Box>
                    <Box>
                        {nextStepBtnVisible && (
                            <Button
                                variant="contained"
                                sx={{ width: "140px", fontSize: 14 }}
                                onClick={handleOpenNextStep}
                            >
                                Далее
                            </Button>
                        )}
                    </Box>
                </Box>
            </Stack>

            <OnboardingDialog
                open={onboardingOpen}
                onClose={handleCloseOnboarding}
                content={steps[currentOnboardingStep]?.onboardingContent}
            />
        </Container>
    );
};