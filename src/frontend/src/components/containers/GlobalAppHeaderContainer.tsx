import { useContext } from "react";
import { UserContext } from "../../App";
import { FaList, FaPlus } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../enums/Routes";
import { MagicAnimationContainer } from "./MagicAnimationContainer";
import { MagicAnimationContainerModes } from "../../enums/components/containers/MagicAnimationContainerModes";
import { GlobalAppHeaderContainerAction } from "../../enums/components/containers/GlobalAppHeaderContainerAction";

export function GlobalAppHeaderContainer(props: {
    action: GlobalAppHeaderContainerAction,
    title?: string
}){
    const [state, reducer] = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="flex size-full-width margin-bottom-double">
            <div className="rounded-button">
                <MagicAnimationContainer mode={MagicAnimationContainerModes.AlwaysOn}>
                    {props.action === GlobalAppHeaderContainerAction.NewProject &&
                        <div className="rounded-button larger pointer" onClick={() => navigate(Routes.DirectorySelector)} title="New Project">
                            <FaPlus />
                        </div>
                    }
                    {props.action === GlobalAppHeaderContainerAction.AllProjects &&
                        <div className="rounded-button larger pointer" onClick={() => navigate(Routes.AllProjects)} title="All Projects">
                            <FaList />
                        </div>
                    }
                    {props.action === GlobalAppHeaderContainerAction.EditProject &&
                        <div className="rounded-button larger pointer" onClick={() => navigate(Routes.Editor)} title="Project Editor">
                            <FaList />
                        </div>
                    }
                    {props.action === GlobalAppHeaderContainerAction.Back &&
                        <div className="rounded-button larger pointer" onClick={() => history.back()} title="Go Back">
                            <FaAngleLeft />
                        </div>
                    }
                </MagicAnimationContainer>
            </div>
            <div className="flex-spacer flex flex-center larger">
                {props.title}
            </div>
            {!!state.activeUser && <div title={state.activeUser.email} className="rounded-button larger pointer">{state.activeUser.firstName[0]}{state.activeUser.lastName[0]}</div>}
        </div>
    );
}