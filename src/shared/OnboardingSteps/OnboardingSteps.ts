export interface OnboardingStepContent {
    title: string;
    description: string;
    image: string;
    steps?: string[];
}

export interface StepConfig {
    label: string;
    onboardingContent: OnboardingStepContent;
}

export const onboardingSteps: StepConfig[] = [
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