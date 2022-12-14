import * as React from 'react';
import {
    InfiniteMenuShape, 
    DMMenuItem,
} from "../../types";
import {
    useFeatureSelect,
    useFeatureDispatch,
} from "../../../Shared/store/hooks";
import {
    Icon,
    routeTo,
} from "../../../Shared";
import {
    selectDiveMalta,
    increaseShowNumber,
    setDiveMaltaKey,
} from "../../";
import {
    useMediaQuery,
    Button,
    Box,
    List,
    Paper,
    MenuItem,
    ListItemText,
    ListItemIcon,
} from "@mui/material";

export default function InfiniteMenu(props:InfiniteMenuShape) {
    let open = true;
    const dispatch = useFeatureDispatch();
    const diveMalta = useFeatureSelect( selectDiveMalta );
    const {list, showInfiniteMenu, showNumber} = diveMalta;
    const isMobile = !useMediaQuery("(min-width:900px)");
    if(isMobile) open = false;
    if (showInfiniteMenu) open = true;

    const loadMore = () =>{
        dispatch(increaseShowNumber({by:2, max: list.length}));
    };

    const menuButtonClick = () => {
        dispatch(setDiveMaltaKey({key: "showInfiniteMenu", value: !open}));
    };

    return (
        <Box sx={{m:0.5, mt:1.5}}>
            <Box sx={{m:0.5}}>
            {isMobile ? <Button
                fullWidth
                sx={{mb:1}}
                color={!open ? "secondary" : "primary"}
                variant="contained"
                id="infinite-button"
                aria-controls={open ? 'infinite-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    menuButtonClick();
                }}>
                <span style={{marginLeft:8,marginRight:8}}>
                    { open ? `Hide nav` : `Nav` }
                </span>
                { open ? <Icon icon="up" /> : <Icon icon="down" /> }
            </Button> : null }
                { open ? <Paper>
                    <List id="infinite-menu">
                        { list.map((item:DMMenuItem, i: number) => {
                            const {
                                title,
                                icon,
                                slug,
                            } = item.value;
                            if (i >= showNumber) return null
                            return (<MenuItem 
                                        key={`track_${i}`}
                                        onClick={(e:React.MouseEvent) => {
                                            e.preventDefault();
                                            dispatch(routeTo(`/${slug}`));
                                        }}>
                                        <ListItemIcon>
                                            <Icon icon={icon} color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={title}
                                        />
                                    </MenuItem>);
                        })}
                    </List>
                    {open ? <Box sx={{display:"flex"}}>
                                { list.length > showNumber ? <Button
                                    sx={{m:0.5}}
                                    id="infinite-button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        loadMore();
                                    }}>
                                    <span style={{
                                        marginLeft: "8px", marginRight: "8px"}}>
                                        {showNumber} of {list.length}. More?
                                    </span>
                                    <Icon icon="tap" />
                                </Button>  : null  }
                        </Box> : null }
                </Paper> : null }
            </Box>
        </Box>
    );
}
