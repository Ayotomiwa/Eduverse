import {
    Box,
    Card,
    Checkbox, darken, LinearProgress,
    ListItem,
    ListItemText, Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {AnimatePresence, motion} from "framer-motion";
// import {AnimatePresence, motion} from "framer-motion";


const PagesTable = ({
                        items,
                        onDeselectAll,
                        onDeselectOne,
                        onSelectAll,
                        onSelectOne,
                            selected,
                        columnHeaders,
                        pagination,
                        checkable,
                        handleRowClick,

                    }) => {


    const selectedSome = (selected?.length > 0) && (selected?.length < items.length);
    const selectedAll = (items?.length > 0) && (selected?.length === items.length);
    const MotionTableRow = motion(TableRow);
    const columnLength = Object.keys(columnHeaders).length;
    const isLoading = false;


    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) || "N/A";
    };

    const handlePageChange = () => {


    }


    return (
        // <Card elevation={6} sx={{overflowX: "auto", border: "0.5px solid black", boxShadow: 3}}>
            <Box sx={{overflowX: "auto"}}>
            <Box sx={{minWidth: "100%", maxHeight: "700px", overflowY:"auto", minHeight:"400px"}}>
                <Table stickyHeader size="small">
                    {/*<TableHead sx={{backgroundColor:"rgb(59, 61, 145, 0.3)"}}>*/}
                    <TableHead>
                        <TableRow sx={{
                            // backgroundColor: "rgb(59, 61, 145, 0.5)",
                            textTransform: "uppercase",
                            height: "60px"
                        }}>
                            {checkable && (
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            onSelectAll?.();
                                        } else {
                                            onDeselectAll?.();
                                        }
                                    }}
                                />
                            </TableCell>
                            )}
                            {Object.entries(columnHeaders).map(([columnHeader], index) => (
                                <TableCell key={index}>
                                    <Typography textAlign="center" variant="subtitle2" color="primary"
                                    sx={{fontWeight:500}}
                                    >
                                        {columnHeader}
                                    </Typography>
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                                Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={columnLength + 1}>
                                            <Skeleton variant="rectangular" width="100%"/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) :
                            items?.length > 0 ? (
                            <AnimatePresence>
                                {items.map((item, index) => {

                                    const isSelected = selected?.includes(item.id);

                                    return (
                                        <MotionTableRow
                                            key={item.id? item.id: index}
                                            initial={{opacity: 1, x: 0}}
                                            exit={{opacity: 0, x: -100}}
                                            transition={{duration: 0.3}}
                                            layout
                                            selected={isSelected}
                                            onClick={() => {
                                                if(selectedSome || selectedAll) {
                                                    return
                                                }
                                              handleRowClick(item.id)
                                            }}
                                            sx={{
                                                cursor: 'pointer',
                                                background: "unset",
                                                "&:hover, &:active, &:focus": {
                                                    color: "rgb(99, 102, 241, 0.5)",
                                                }
                                            }}
                                        >
                                            {checkable && (
                                            <TableCell
                                                padding="checkbox">

                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(event) => {
                                                        if (event.target.checked) {
                                                            onSelectOne?.(item.id);
                                                        } else {
                                                            onDeselectOne?.(item.id);
                                                        }
                                                    }}
                                                    onClick={(event) => {
                                                        if (selected.length === 0) {
                                                            console.log("Inside Selected")

                                                        }
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </TableCell>
                                            )}
                                            {Object.entries(columnHeaders).map(([header, path], index) => (
                                                <TableCell
                                                    key={index}>
                                                    {index === 0 ? (
                                                        // <Stack alignItems="center" direction="row" spacing={2}>
                                                            <Typography
                                                                textAlign="center"
                                                                sx={{
                                                                    background: "unset",
                                                                    bgcolor:getNestedValue(item, path) === "N/A"? "pink": "unset",
                                                                    // border:"1px red solid"
                                                                }}
                                                                variant="subtitle2">
                                                                {getNestedValue(item, path)}
                                                            </Typography>
                                                        // </Stack>
                                                    ) : (
                                                        header.includes("date") ? (
                                                            <ListItem>
                                                                <ListItemText
                                                                    primary={
                                                                        <Typography  textAlign="center" variant="subtitle2">
                                                                            {new Date(getNestedValue(item, path)).toLocaleDateString()}
                                                                        </Typography>
                                                                    }>
                                                                </ListItemText>
                                                            </ListItem>
                                                        ) : (
                                                            <Typography
                                                                textAlign="center"
                                                                sx={{
                                                                    background: "unset",
                                                                    bgcolor:getNestedValue(item, path) === "N/A"? "pink": "unset",
                                                                }}
                                                                variant="subtitle2">
                                                                {getNestedValue(item, path)}
                                                            </Typography>
                                                        )
                                                    )}
                                                </TableCell>
                                            ))}
                                        </MotionTableRow>
                                    )
                                })}
                            </AnimatePresence>
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={columnLength + 1}>
                                    No Data to be Displayed
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            {/*</Scrollbar>*/}
                {pagination &&
            <TablePagination
                component="div"
                count={5}
                onPageChange={handlePageChange}
                onRowsPerPageChange={() => {
                }}
                page={0}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 25]}
            />
                }
        </Box>
    );
};

export default PagesTable;