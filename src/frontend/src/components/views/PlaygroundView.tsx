import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { GlobalAppHeaderContainerAction } from "@/enums/components/containers/GlobalAppHeaderContainerAction";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";


const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

    // Custom StepIcon
    const CustomStepIcon = styled("div")<{
    completed: boolean;
    active: boolean;
    }>(({ completed, active }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: active || completed ? "rgb(23, 19, 19)" : "rgb(1, 1, 1)",
    color: "rgb(0, 255, 4)",
    fontSize: 14,
    fontWeight: 500,
    border: `2px solid rgb(26, 255, 0)`,
    "&::before": {
        content: completed ? "'✔'" : "''",
    },
    }));

    const VerticalStepperWithButton: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleStepClick = (step: number) => {
        if (!completed) {
        setActiveStep(step);
        }
    };

    const handleButtonClick = () => {
        if (completed) {
        // Reset everything
        setActiveStep(0);
        setCompleted(false);
        } else {
        // Complete the stepper
        setCompleted(true);
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", marginTop: 4, color: "white" }}>
        <Stepper
            activeStep={activeStep}
            orientation="vertical"
            connector={
            <StepConnector
                sx={{
                "& .MuiStepConnector-line": {
                    borderColor: "rgb(4, 255, 0)",
                },
                }}
            />
            }
        >
            {steps.map((label, index) => (
            <Step key={label} className="">
                <StepLabel
                onClick={() => handleStepClick(index)}
                StepIconComponent={(props) => (
                    <CustomStepIcon
                    completed={completed || index < activeStep}
                    active={index === activeStep}
                    >
                    {index < activeStep || (completed && index === steps.length - 1)
                        ? ""
                        : index + 1}
                    </CustomStepIcon>
                )}
                sx={{
                    cursor: completed ? "not-allowed" : "pointer",
                    "& .MuiStepLabel-label": {
                    color: index === activeStep || (completed && index === steps.length - 1) ? 
                    "rgb(17, 255, 0)" : "rgb(116, 116, 116)",
                    fontWeight: index === activeStep ? "bold" : "normal",
                    
                    },
                }}
                >
                {label}
                </StepLabel>
            </Step>
            ))}
        </Stepper>
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
            <Button
            variant="contained"
            color="primary"
            disabled={!completed && activeStep !== steps.length - 1}
            onClick={handleButtonClick}
            sx={{
                backgroundColor: completed
                ? "rgba(255, 0, 0, 0.8)"
                : "rgba(0, 255, 0, 0.8)",
                "&:hover": {
                backgroundColor: completed
                    ? "rgba(255, 0, 0, 1)"
                    : "rgba(0, 255, 0, 1)",
                },
            }}
            >
            {completed ? "Reset" : "Complete"}
            </Button>
            {completed && (
            <Typography sx={{ color: "rgba(255, 0, 0, 0.8)", marginTop: 2 }}>
                Stepper is complete. Click reset to start over.
            </Typography>
            )}
        </Box>
        </Box>
    );
};

export default VerticalStepperWithButton;


const StyledContainer = styled.div`
    
`;

export function PlaygroundView() {
    const [state, reducer] = useContext(UserContext);
    
        return(
            <StyledContainer className="size-full padding-double color-default flex flex-direction-column">
                <GlobalAppHeaderContainer title="All Projects" action={GlobalAppHeaderContainerAction.AllProjects}/>
                <div>
                    <VerticalStepperWithButton />
                </div>
            </StyledContainer>
        );
}