import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {Button, InputAdornment, lighten, OutlinedInput, SvgIcon, useTheme} from "@mui/material";
import {useState} from "react";


export const SearchBar = ({setSearchTerm, resetList, placeHolder}) => {
    const [searchTermHolder, setSearchTermHolder] = useState("")
    const theme = useTheme();

const handleSearch = (event) => {
    event.preventDefault();
    if(event.target.value === ""){
        return;
    }
    resetList(true);
    setSearchTerm(searchTermHolder);
    console.log("searching");
};

const handleInputChange= (event) => {
    event.preventDefault();
    if (event.target.value === ""){
        resetList(false);
        return
    }
    setSearchTermHolder(event.target.value);
    console.log(searchTermHolder);
};



return (
    <OutlinedInput
        size="small"
      defaultValue=""
      fullWidth
      placeholder={placeHolder}
      onChange={handleInputChange}
      onKeyPress={(event) => {
            if (event.key === 'Enter') {
                handleSearch(event);
            }
      }}
      endAdornment={(
        <InputAdornment position="end">
          <Button
              onClick={handleSearch}
          >
              <SvgIcon
                  fontSize="medium"
                  sx={{color:"text.contrast"}}
              >
                  <MagnifyingGlassIcon />
              </SvgIcon>
          </Button>
        </InputAdornment>
      )}
      sx={{backgroundColor:`${lighten(theme.palette.secondary.main,0.9)}`, borderRadius: "12px",
          // "& .MuiOutlinedInput-notchedOutline": {
          //     borderColor: "transparent",
          // },
          "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "gray",
          }
      }}
    />
);
}


