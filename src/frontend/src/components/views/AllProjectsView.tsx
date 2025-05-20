import styled from "styled-components";
import { GlobalAppHeaderContainer } from "../containers/GlobalAppHeaderContainer";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { GlobalAppHeaderContainerAction } from "../../enums/components/containers/GlobalAppHeaderContainerAction";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../enums/Routes";
import { FaAngleRight, FaSistrix } from "react-icons/fa6";
import { MagicAnimationContainer } from "../containers/MagicAnimationContainer";
import { MagicAnimationContainerModes } from "../../enums/components/containers/MagicAnimationContainerModes";
import { ProjectStatusContainer } from "../containers/ProjectStatusContainer";
import { FormatDate } from "@/services/engines/DateEngine";

const StyledContainer = styled.div`
    & .rounded-input{
        min-width: 300px;
        width: 50vw;
        max-width: 600px;
        height: 50px;
    }

    & .rounded-input > img{
        width: 30px;
        height: 30px;
    }

    & .rounded-input > input{
        background: none;
        border: none;
        color: var(--app-color);
    }

    & .rounded-input > input:focus{
        outline: none;
    }

    & .align{
        margin: 0 auto;
    }
`;

const ProjectsContainer = styled.div`
    width: 85%;
    margin: 0 auto;

    & > div:first-of-type{
        border-top-left-radius: calc(var(--app-border-radius) / 2);
        border-top-right-radius: calc(var(--app-border-radius) / 2);
    }

    & > div:last-of-type{
        border-bottom-left-radius: calc(var(--app-border-radius) / 2);
        border-bottom-right-radius: calc(var(--app-border-radius) / 2);
        border-bottom: unset;
    }

    & > div{
        display: flex;
        background-color: var(--app-background-secondary);
        border-bottom: thin solid var(--app-background-color);
    }

    & > div > *{
        padding: var(--app-padding);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    & .header > div{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .rounded-button{
        background-color: var(--app-background-color);
    }
`;

export function AllProjectsView() {
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>("");
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const filteredProjects = state.projects.filter((project) => {
        return (
            project.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            project.description.toLowerCase().includes(searchText.toLowerCase())
        )
    });

    return(
        <StyledContainer className="size-full padding-double color-default flex flex-direction-column">
            <GlobalAppHeaderContainer title="All Projects" action={GlobalAppHeaderContainerAction.NewProject}/>
            <div className="center-with-margin margin-bottom">
                <MagicAnimationContainer mode={MagicAnimationContainerModes.OnValueTrue} value={isSearchFocused}>
                    <div className="rounded-input background-color-secondary padding-half border-radius flex flex-center" title="Start typing to search / filter the projects.">
                        <FaSistrix className="margin-horizontal" />
                        <input
                            type="text"
                            placeholder="Type to start filtering projects"
                            className="flex-spacer"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}/>
                    </div>
                </MagicAnimationContainer>
            </div>
            <ProjectsContainer className="projects-container">
                <div className="header bold">
                    <div className="owner">Owner</div>
                    <div className="details flex-spacer">Details</div>
                    <div className="status">Status</div>
                    <div className="created-on">Created On</div>
                    <div></div>
                </div>
                {filteredProjects.map((project) => {
                    return(
                        <div className="project-item pointer" key={project.id} onClick={() => navigate(Routes.ProjectDetailsView.replace(":id", `${project.id}`))}>
                            <div title={project.creator?.email}>
                                <div className="owner rounded-button larger pointer">{project.creator?.firstName[0]}{project.creator?.lastName[0]}</div>
                            </div>
                            <div className="details flex-spacer">
                                <div className="title bold">{project.title}</div>
                                <div className="smaller description">{project.description}</div>
                            </div>
                            <div className="status">
                                <ProjectStatusContainer process={project.process} />
                            </div>
                            <div className="created-on">{FormatDate(project.timestamp)}</div>
                            <div>
                                <FaAngleRight />
                            </div>
                        </div>
                    );
                })}
            </ProjectsContainer>
        </StyledContainer>
    );
}