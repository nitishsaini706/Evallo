import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, TextField, Button, Typography, Container, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions,
    DialogContent, DialogTitle,
} from '@material-ui/core';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ToastContainer, toast } from 'react-toastify';
import { ContentService } from "../handler/content"; // Updated import path
import { useNavigate } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@mui/icons-material/Edit';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        border: "1px solid black",
        marginTop: "20px"
    },
    inputField: {
        marginRight: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    }
}));

const AdminPanel = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState({ title: '', price: '', category: '', status: 'pending' });
    const [contents, setContents] = useState([]);
    const [contentType, setContentType] = useState('test');
    const [tags, setTags] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [editingContent, setEditingContent] = useState(null); 
    
    useEffect(() => {
        fetchAllAdminContents();
    }, []);

    const handleEditClick = (content) => {
        setEditingContent(content); // Set the content to be edited
        setNewContent({ title: content.title, price: content.price, category: content.category });
        setTags(content.tags || []);
        setDifficulty(content.difficulty || '');
        setTargetAudience(content.targetAudience || '');
        setContentType(content.contentType);
        setOpen(true); 
    };
    
    const handleUpdateContent = async () => {
        try {
            let body = {
                ...newContent,
                tags: tags,
                difficulty: contentType === 'test' ? difficulty : undefined,
                targetAudience: contentType === 'test' ? targetAudience : undefined,
            };
            const response = await ContentService.updateContent( body, localStorage.getItem('token'));
            if (response.status === 200) {
                toast.success("Content updated successfully");
                setEditingContent(null); // Clear the editing state
                handleClose();
                fetchAllAdminContents(); // Fetch the updated list
            } else {
                toast.error("Failed to update content");
            }
        } catch (error) {
            toast.error("An error occurred while updating content.");
            console.error(error);
        }
    };
    const handleStatusChange = async (event, content) => {
        const token = localStorage.getItem('token');
        const updatedStatus = event.target.value;
        content.status= updatedStatus;
        const response = await ContentService.updateContent(content,token);
        if (response) {
            toast.success("Content status updated successfully.");
            await fetchAllAdminContents();
        } else {
            toast.error("Failed to update content status.");
        }
    };
    const fetchAllAdminContents = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await ContentService.getAllAdminContents(token);
            setContents(response || []);
        } catch (error) {
            toast.error("An error occurred while fetching contents.");
            console.error(error);
            // Consider redirecting to login or clearing the token if it's an auth issue
        }
    };
    const handleAddTag = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            setTags([...tags, event.target.value]);
            event.target.value = ''; // Clear the input
        }
    };
    const handleDeleteTag = (tagToDelete) => {
        setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
    };

    const handleContentChange = (event) => {
        setContentType(event.target.value);
    };
    const renderContentSpecificFields = () => {
        if (contentType === 'test') {
            return (
                <React.Fragment>
                    <TextField
                        margin="dense"
                        name="difficulty"
                        label="Difficulty Level"
                        type="text"
                        fullWidth
                        value={difficulty}
                        onChange={(e) => { setDifficulty(e.target.value) }}
                    />
                    <TextField
                        margin="dense"
                        name="targetAudience"
                        label="Target Audience"
                        type="text"
                        fullWidth
                        value={targetAudience}
                        onChange={(e) => { setTargetAudience(e.target.value) }}
                    />
                </React.Fragment>
            );
        } else if (contentType === 'worksheet') {
            // Add more fields specific to 'worksheet' if needed
        }
    };
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setNewContent({ title: '', price: '', category: '' });
        setTags([]);
        setDifficulty('');
        setTargetAudience('');
        setContentType('test');
        if (editingContent) {
            setEditingContent(null);
        } 
        setOpen(false);
};

    const handleAddContent = async () => {
        try {
            console.log('newContent', newContent)
            let body={};
            body = {...newContent }
            body.tags = tags;
            body.contentType = contentType;
            body.status='pending';
            if(contentType == 'test'){
                body.difficulty = difficulty;
                body.targetAudience = targetAudience;
            }
            const response = await ContentService.addContents(body, localStorage.getItem('token'));
            if (response.status == 201) {
                setContents([...contents, newContent]);
                toast.success("Content added successfully");
                handleClose();
                setNewContent({ title: '', price: '', category: '' });
                fetchAllAdminContents();
            } else {
                toast.error("Failed to add content");
            }
        } catch (error) {
            toast.error("An error occurred while adding content.");
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewContent({ ...newContent, [name]: value });
    };

    const handleDelete = async (item)=>{
        try{
            const response = await ContentService.deleteContent(item._id, localStorage.getItem('token'));
            if(response){
                console.log('response', response);
                toast.success("Item deleted successfully");
                fetchAllAdminContents();
            }
        }catch(e){
            console.log(e);

        }
    }

    return (
        <Container className={classes.root}>
            <ToastContainer />
            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h4" gutterBottom>
                    Admin Panel
                </Typography>
                <div>

                <Button variant="contained" style={{ backgroundColor: '#00b800', color: "white" }} onClick={() => { localStorage.removeItem('role'); localStorage.removeItem('token'); navigate("/login", { replace: true }) }}>Log Out</Button>
                <Button variant="contained" color="primary" style={{marginLeft:"5px"}} onClick={() => { navigate("/", { replace: true }) }}>MarketPlace</Button>
                </div>

            </div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Upload Content
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Content</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="content-type-label">Content Type</InputLabel>
                        <Select
                            labelId="content-type-label"
                            id="content-type-select"
                            value={contentType}
                            onChange={handleContentChange}
                        >
                            <MenuItem value="test">Test</MenuItem>
                            <MenuItem value="worksheet">Worksheet</MenuItem>
                            {/* Add more content types as needed */}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Content Title"
                        type="text"
                        fullWidth
                        value={newContent.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={newContent.price}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        name="category"
                        label="category"
                        type="text"
                        fullWidth
                        value={newContent.category}
                        onChange={handleChange}
                    />
                    {tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                        />
                    ))}
                    <TextField
                        margin="dense"
                        name="tags"
                        label="Tags"
                        type="text"
                        fullWidth
                        onKeyPress={handleAddTag}
                        placeholder="Press 'Enter' to add tags"
                    />
                    
                    {renderContentSpecificFields()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={editingContent ? handleUpdateContent : handleAddContent} color="primary">
                        {editingContent ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} className={classes.form}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell style={{ fontWeight: 800 }}>Content Title</TableCell>
                            <TableCell style={{ fontWeight: 800 }} >Category</TableCell>
                            <TableCell style={{ fontWeight: 800 }} >Price</TableCell>
                            <TableCell style={{ fontWeight: 800 }} >Status</TableCell>
                            <TableCell style={{ fontWeight: 800 }} >Edit</TableCell>
                            <TableCell style={{ fontWeight: 800 }} >Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contents?.map((content, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {content.title}
                                </TableCell>
                                <TableCell >{content.category}</TableCell>
                                <TableCell >{content.price ?? 0}</TableCell>
                                <TableCell>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="status-label">Status</InputLabel>
                                        <Select
                                            labelId="status-label"
                                            id="status"
                                            value={content.status}
                                            onChange={(event) => handleStatusChange(event, content)}
                                            label="Status"
                                        >
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="published">Published</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell ><EditIcon style={{ cursor: "pointer" }} onClick={() => handleEditClick(content)} /></TableCell>
                                <TableCell ><DeleteRoundedIcon style={{ cursor: "pointer" }} onClick={()=>handleDelete(content)} /></TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminPanel;
