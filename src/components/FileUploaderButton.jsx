import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    // clip: 'rect(0 0 0 0)',
    // clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    // position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploaderButton= () =>{


    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            color="secondary"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Browse
            <VisuallyHiddenInput type="file" />
        </Button>
    );

};

export default FileUploaderButton;