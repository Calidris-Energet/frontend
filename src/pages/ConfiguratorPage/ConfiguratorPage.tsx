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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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
                title: "Результа",
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

            {/* Окно онбординга */}
            <Dialog
                open={onboardingOpen}
                onClose={handleCloseOnboarding}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {steps[currentOnboardingStep]?.onboardingContent?.title || "Онбординг"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        {/* Картинка */}
                        {steps[currentOnboardingStep]?.onboardingContent?.image && (
                            <Box 
                                sx={{ 
                                    width: '100%', 
                                    height: 200, 
                                    backgroundImage: `url(${steps[currentOnboardingStep].onboardingContent.image})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: 1
                                }}
                            />
                        )}
                        
                        {/* Описание */}
                        <Typography variant="body1">
                            {steps[currentOnboardingStep]?.onboardingContent?.description}
                        </Typography>
                        
                        {/* Шаги */}
                        {steps[currentOnboardingStep]?.onboardingContent?.steps && currentOnboardingStep !== 3 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Шаги:
                                </Typography>
                                <Stack spacing={1}>
                                    {steps[currentOnboardingStep].onboardingContent.steps.map((stepText, index) => (
                                        <Box key={index} display="flex" alignItems="flex-start">
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    minWidth: 24, 
                                                    height: 24, 
                                                    borderRadius: '50%', 
                                                    backgroundColor: 'primary.main', 
                                                    color: 'white', 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem',
                                                    mr: 1
                                                }}
                                            >
                                                {index + 1}
                                            </Typography>
                                            <Typography variant="body2">
                                                {stepText}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOnboarding}>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};