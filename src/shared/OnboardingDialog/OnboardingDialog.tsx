// shared/components/OnboardingDialog/OnboardingDialog.tsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Box,
    Typography
} from "@mui/material";
import { OnboardingStepContent } from "src/shared/OnboardingSteps/OnboardingSteps";

interface OnboardingDialogProps {
    open: boolean;
    onClose: () => void;
    content?: OnboardingStepContent;
}

export const OnboardingDialog = ({ open, onClose, content }: OnboardingDialogProps) => {
    // Значения по умолчанию вместо проверки на null
    const {
        title = "Онбординг",
        description = "",
        image = "",
        steps = []
    } = content || {};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    {/* Картинка */}
                    {image && (
                        <Box 
                            sx={{ 
                                width: '100%', 
                                height: 200, 
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1
                            }}
                        />
                    )}

                    {/* Описание */}
                    {description && (
                        <Typography variant="body1">
                            {description}
                        </Typography>
                    )}

                    {/* Шаги */}
                    {steps.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Шаги:
                            </Typography>
                            <Stack spacing={1}>
                                {steps.map((stepText, index) => (
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
                <Button onClick={onClose}>
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
};