import { useState, useEffect } from 'react';
import { AddPost } from '../../modules/postManager';
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap"
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../modules/categoryManager';
import { wait } from '@testing-library/user-event/dist/utils';

const PostForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    getAllCategories(false).then(data => setCategories(data.categories))}, [])

    const submitPost = (e) => {
        e.preventDefault();
          const post = {
            title,
            content,
            imageLocation,
            categoryId
          }

          AddPost(post).then((postData) => {navigate(`/postDetails/${postData.id}`)});
      };

    return (
        <>
            <h2>New Post</h2>
            <Form onSubmit={submitPost}>
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input name="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="content">Content</Label>
                <Input name="content"
                type="textarea"
                onChange={(e) => setContent(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageLocation">Image Location URL</Label>
                <Input name="imageLocation"
                type="text"
                onChange={(e) => setImageLocation(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="categoryId">Select A Category</Label>
                <select onChange={(e) => setCategoryId(e.target.value)}>
                {categories.map((category) => <option value={category.id} key={`addpostcategory--${category.id}`}>{category.name}</option>)}
                </select>
            </FormGroup>
            <Button
                id="post-save-btn"
                color="success">
                    Save
                </Button>

            </Form>
        </>
    )
}

export default PostForm