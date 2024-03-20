import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import {darken, lighten} from "@mui/material";
import {useState} from "react";

export default function SimpleTab({tabs, handleTabChange}) {

    const [tabValue, setTabValue] = useState(0);


    const handleTab = (event, newValue) => {
        console.log(newValue);
        setTabValue(newValue);
        handleTabChange(newValue);
    }




    return (
        <Tabs value={tabValue}  onChange={handleTab}>
            <TabsList>
                {tabs.map((tab, index) => (
                    <Tab key={index} value={index}>
                        {tab}
                    </Tab>
                ))};
            </TabsList>
        </Tabs>
    );
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Tab = styled(BaseTab)`
  font-family:  'Plus Jakarta Sans', sans-serif ;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;
    

  &:focus {
    color: #fff;
    outline: 3px solid ${grey[400]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: grey;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


const TabsList = styled(BaseTabsList)(
    () => `
  min-width: 400px;
  background-color: ${darken ("#c9d1d3", 0.3)};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);
