import React, {useEffect} from 'react'

import AddIcon from "../../../assets/icons/add.svg";
import AppsIcon from "../../../assets/icons/apps.svg";
import ArrowDownwardIcon from "../../../assets/icons/arrow-downward.svg";
import ArrowUpwardIcon from "../../../assets/icons/arrow-upward.svg";
import AutorenewIcon from "../../../assets/icons/autorenew.svg";
import CalendarIcon from "../../../assets/icons/calendar.svg";
import CancelSolidIcon from "../../../assets/icons/cancel-solid.svg";
import CheckedIcon from "../../../assets/icons/checkbox-checked.svg";
import CheckDisabledIcon from "../../../assets/icons/checkbox-disabled.svg";
import CheckIndeterminatedIcon from "../../../assets/icons/checkbox-indeterminated.svg";
import UncheckedIcon from "../../../assets/icons/checkbox-unchecked.svg";
import ChevronDownwardIcon from "../../../assets/icons/chevron-downward.svg";
import ChevronLeftIcon from "../../../assets/icons/chevron-left.svg";
import ChevronRightIcon from "../../../assets/icons/chevron-right.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import DocumentDefaultIcon from "../../../assets/icons/document-default.svg";
import DocumentDownloadIcon from "../../../assets/icons/document-download.svg";
import DocumentUploadIcon from "../../../assets/icons/document-upload.svg";
import DoneIcon from "../../../assets/icons/done.svg";
import EletronicIcon from "../../../assets/icons/eletronic.svg";
import EllipseIcon from "../../../assets/icons/ellipse.svg";
import EmailIcon from "../../../assets/icons/email.svg";
import ErrorIcon from "../../../assets/icons/error.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import FormatListNumberedIcon from "../../../assets/icons/format-list-numbered.svg";
import FullscreenExitIcon from "../../../assets/icons/fullscreen-exit.svg";
import FullscreenFullIcon from "../../../assets/icons/fullscreen-full.svg";
import GridIcon from "../../../assets/icons/grid.svg";
import HelpSolidIcon from "../../../assets/icons/help-solid.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import LocationOnIcon from "../../../assets/icons/location-on.svg";
import MapIcon from "../../../assets/icons/map.svg";
import MenuIcon from "../../../assets/icons/menu.svg";
import SelectedRadioIcon from "../../../assets/icons/radio-selected.svg";
import UnSelectedRadioIcon from "../../../assets/icons/radio-unselected.svg";
import RefreshIcon from "../../../assets/icons/refresh.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import SettingsIcon from "../../../assets/icons/settings.svg";
import SuperuserIcon from "../../../assets/icons/superuser.svg";
import ToggleDarkOffIcon from "../../../assets/icons/toggle-dark-off.svg";
import ToggleDarkOnIcon from "../../../assets/icons/toggle-dark-on.svg";
import ToggleLightOffDisabledIcon from "../../../assets/icons/toggle-light-off-disabled.svg";
import ToggleLightOffIcon from "../../../assets/icons/toggle-light-off.svg";
import ToggleLightOnDisabledIcon from "../../../assets/icons/toggle-light-on-disabled.svg";
import ToggleLightOnIcon from "../../../assets/icons/toggle-light-on.svg";
import TuneIcon from "../../../assets/icons/tune.svg";
import UserIcon from "../../../assets/icons/user.svg";
import VisibilityOffIcon from "../../../assets/icons/visibility-off.svg";
import VisibilityOnIcon from "../../../assets/icons/visibility-on.svg";
import ZoomInIcon from "../../../assets/icons/zoom-in.svg";
import MoreIcon from "../../../assets/icons/more.svg";

import classes from "./SVG.module.scss";
import classNames from 'classnames';
import { colors } from '../../../shared/style'


interface SVGProps{
    name : string;
    width?: string;
    height?: string;
    color? : string;
    isHoverEffect?: boolean;
}

export const SVG = ({name, width="24", height="24", color=colors.darkHigh, isHoverEffect=false}:SVGProps) => {

    const ui = { width, height, fill: color };
    const propsCursor = { ...ui, className: classNames(isHoverEffect ? classes.cursor : "", classes[color] ) }
    const propsElse = { ...ui, className: classNames(isHoverEffect ? classes[name] : "", classes[color] )  }

    
    const icons: {[name: string]: JSX.Element} = {
        "upward": <ArrowUpwardIcon {...propsElse}/>,
        "downward": <ArrowDownwardIcon {...propsElse}/>,
        "dropdown": <ChevronDownwardIcon {...propsElse}/>,
        "filter": <FilterIcon {...propsElse}></FilterIcon>,
        "search": <SearchIcon {...propsCursor}></SearchIcon>,
        "autorenew": <AutorenewIcon {...propsCursor} />,
        "document": <DocumentDefaultIcon {...propsCursor}/>,
        "download": <DocumentDownloadIcon {...propsCursor}/>,
        "upload": <DocumentUploadIcon {...propsCursor}/>,
        "zoomIn": <ZoomInIcon {...propsCursor}></ZoomInIcon>,
        "delete": <DeleteIcon {...propsCursor}></DeleteIcon>,
        "add": <AddIcon {...propsCursor}></AddIcon>,
        "done": <DoneIcon {...propsCursor}></DoneIcon>,
        "error": <ErrorIcon {...propsCursor}></ErrorIcon>,
        "visibilityOn": <VisibilityOnIcon {...propsCursor}></VisibilityOnIcon>,
        "visibilityOff": <VisibilityOffIcon {...propsCursor}></VisibilityOffIcon>,
        "ellipse": <EllipseIcon {...propsCursor}></EllipseIcon>,
        "forward": <ChevronRightIcon {...propsCursor}/>,
        "backward": <ChevronLeftIcon {...propsCursor}/>,
        "checked": <CheckedIcon {...propsCursor}></CheckedIcon>,
        "unchecked": <UncheckedIcon {...propsCursor}></UncheckedIcon>,
        "checkIndeterminated": <CheckIndeterminatedIcon {...propsCursor} />,
        "checkDisabled": <CheckDisabledIcon {...propsCursor} />,
        "help": <HelpIcon {...propsCursor} />,
        "close": <CloseIcon {...propsCursor} />,
        "calendar": <CalendarIcon {...propsCursor} />,
        "apps": <AppsIcon {...propsCursor} />,
        "cancel": <CancelSolidIcon {...propsCursor} />,
        "eletronic": <EletronicIcon {...propsCursor} />,
        "email": <EmailIcon {...propsCursor} />,
        "fullscreenFull": <FullscreenFullIcon {...propsCursor} />,
        "exitscreenExit": <FullscreenExitIcon {...propsCursor} />,
        "grid": <GridIcon {...propsCursor} />,
        "locationOn": <LocationOnIcon {...propsCursor} />,
        "map": <MapIcon {...propsCursor} />,
        "menu": <MenuIcon {...propsCursor} />,
        "more": <MoreIcon {...propsCursor} />,
        "numberedList": <FormatListNumberedIcon {...propsCursor} />,
        "selectedRadio": <SelectedRadioIcon {...propsCursor} />,
        "unSelectedRadio": <UnSelectedRadioIcon {...propsCursor}/>,
        "refresh": <RefreshIcon {...propsCursor} />,
        "settings": <SettingsIcon {...propsCursor} />,
        "superuser": <SuperuserIcon {...propsCursor} />,
        "tune": <TuneIcon {...propsCursor} />,
        "user": <UserIcon {...propsCursor} />,
        "toggleLightOnDisabled": <ToggleLightOnDisabledIcon {...propsCursor} />,
        "toggleLightOffDisabled": <ToggleLightOffDisabledIcon {...propsCursor} />,
        "toggleLightOn": <ToggleLightOnIcon {...propsCursor} />,
        "toggleLightOff": <ToggleLightOffIcon {...propsCursor} />,
        "toggleDarkOn": <ToggleDarkOnIcon {...propsCursor} />,
        "toggleDarkOff": <ToggleDarkOffIcon {...propsCursor} />,
        "helpSolid": <HelpSolidIcon {...propsCursor} />,
    }

    return (
        <>
            {icons[name]}
        </>
    )   
}
