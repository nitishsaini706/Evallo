import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper, Chip, Card, CardContent, Typography, Grid, TextField, InputAdornment, Container, Button
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentService } from '../handler/content'; 
import { CommentService } from '../handler/comment'; 
import { useNavigate } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        background: '#f7f7f7', // Light grey background for the container
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Subtle shadow
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', // Hover effect
        },
    },
    search: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
    },
    type: {
        fontSize: 14,
        color: theme.palette.text.secondary,
    }, commentList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(2),
    },
    commentListItem: {
        padding: theme.spacing(2),
        borderBottom: '1px solid #ddd',
    },
    commentText: {
        marginLeft: theme.spacing(2),
    },
}));
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const Marketplace = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedContentForPreview, setSelectedContentForPreview] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [contentItems, setContentItems] = useState([]);
    
    const handleOpenPreview = (content) => {
        setSelectedContentForPreview(content);
        setPreviewOpen(true);
        setNewComment("");
        fetchComments(content._id);
    };

    const fetchComments = async (contentId) => {
        
        const fetchedComments = await CommentService.getComments(contentId, token);
        setComments(fetchedComments.data);
    };
    const handleClosePreview = () => {
        setPreviewOpen(false);
        setSelectedContentForPreview(null);
    };
    const getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            width: 400,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: '24',
            padding: '16px 32px 24px',
            overflow: 'auto', // Ensure the content is scrollable
            maxHeight: '80vh',
        };
    };
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const data = await ContentService.getAllContents(token);
                    setContentItems(data);
                } catch (error) {
                    console.error("Error fetching contents:", error);
                    toast.error("Error fetching contents.");
                }
            }
        };

        fetchData();
    }, []);
    const renderContentPreview = (content) => {
        
        switch (content.contentType) {
            case 'test':
                return (
                    <div>
                        <Typography variant="h5">{content.title}</Typography>
                        <Typography variant="body1">Difficulty: {content.difficulty}</Typography>
                        <Typography variant="body1">Audience: {content.targetAudience}</Typography>
                        <Typography variant="body1">Tags: {content.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                            />
                        ))}</Typography>
                    </div>
                );
            case 'worksheet':
                return (
                    <div>
                        <Typography variant="h5">{content.title}</Typography>
                        <Typography variant="body1">Tags: {content.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                            />
                        ))}</Typography>
                    </div>
                );
            default:
                return <div>Unsupported content type</div>;
        }
    };
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }
        try {
            let body = {
                comment: newComment,
                content: selectedContentForPreview._id,
            }
            const response = await CommentService.addComment(body,token);
            if (response.status === 201) {
                toast.success("Comment added successfully");
                setNewComment("");
                setPreviewOpen(false);
            } else {
                toast.error("Failed to add comment");
            }
        } catch (error) {
            toast.error("An error occurred while adding comment.");
            console.error(error);
        }
    };
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Modal
                open={previewOpen}
                onClose={handleClosePreview}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    {selectedContentForPreview && renderContentPreview(selectedContentForPreview)}
                    
                    <List className={classes.commentList}>
                        {comments?.length && comments?.map((comment) => (
                            <ListItem key={comment._id} className={classes.commentListItem}>
                                <ListItemAvatar>
                                    <Avatar></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="body1">{comment.comment}</Typography>}
                                    secondary={comment?.commentedBy?.name ? `Commented by ${comment.commentedBy.name}` : null}
                                
                                />
                            </ListItem>
                        ))}
                    </List>
                    <div>
                        <TextField
                            fullWidth
                            label="New Comment"
                            variant="outlined"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCommentSubmit}
                        >
                            Submit Comment
                        </Button>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
            <div style={{display:'flex',justifyContent:"space-between"}}>

            <Typography variant="h4" gutterBottom>Content Marketplace</Typography>
                            
                <div>

                <Button style={{ backgroundColor:"#10b110",color:"white",height:"35px"}} onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('role');navigate("/login",{replace:true})}}>Log Out</Button>
                   { role == 'admin' ?
                        <Button style={{ marginLeft:"5px"}} color="primary" variant="contained" onClick={()=>{navigate("/admin",{replace:true})}}>Admin Pannel</Button> : null
                } 
                    
                </div>
            </div>
            <TextField
                fullWidth
                className={classes.search}
                label="Search Content"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon className={classes.searchIcon} />
                        </InputAdornment>
                    ),
                }}
            />
            <Grid container spacing={3}>
                {contentItems?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className={classes.card}>
                            <CardContent>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>

                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography variant="h6">Rs. {item.price}</Typography>
                                </div>
                                <Typography className={classes.type}>Type: {item.category}</Typography>
                                <Button style={{marginTop:"10px"}} variant="contained" size="small" color="primary" onClick={() => handleOpenPreview(item)}>Preview</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Marketplace;
