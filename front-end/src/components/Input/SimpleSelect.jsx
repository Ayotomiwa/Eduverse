import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Avatar from "@mui/joy/Avatar";
import {ThemeProvider} from "@mui/joy";
import {useTheme} from "@mui/material";
import ListItemDecorator from '@mui/joy/ListItemDecorator';


export default function SimpleSelect({options, setSelectedFilter}) {
    const theme = useTheme();


    return (
        <ThemeProvider theme={theme}>
            <Select
                placeholder="Select a host"
                defaultValue={options[0].host}
                color="secondary"
                startDecorator={
                    <ListItemDecorator>
                        <Avatar sx={{mr: 1}}>
                            <img width="30" height="30" src="https://img.icons8.com/stickers/100/planner.png"
                                 alt="planner"/>
                        </Avatar>
                    </ListItemDecorator>}


                size="lg"
            >
                {options.map((option, index) => (
                    <Option
                        key={index}
                        onClick={() => setSelectedFilter(option.host)}
                        value={option.host}
                    >
                        {option.type === "MODULE" ? (
                            <>
                                <ListItemDecorator>
                                    <Avatar sx={{mr: 1}}>
                                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/books.png"
                                             alt="books"/>
                                    </Avatar>
                                </ListItemDecorator>
                                {option.host}
                            </>
                        ) : (
                            option.type === "GROUP" ? (
                            <>
                                <ListItemDecorator>
                                    <Avatar sx={{mr: 1}}>
                                        <img width="30" height="30" src="https://img.icons8.com/stickers/100/groups.png"
                                             alt="groups"/>
                                    </Avatar>
                                </ListItemDecorator>
                                {option.host}
                            </>
                            ) : (
                                <>
                                    {option.host}
                                </>
                            )
                        )}
                    </Option>
                ))}
            </Select>
        </ThemeProvider>
    );
}