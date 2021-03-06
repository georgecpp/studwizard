import gql from "graphql-tag";
import React, {useContext,useRef,useState} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import {Button, Card, Form, Icon, Label,Image} from 'semantic-ui-react';
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import { useHistory, Link } from "react-router-dom";
import MyPopup from "../util/MyPopup";

function SinglePost(props) {

    const history = useHistory();
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        history.push('/');
    }

    let postMarkup;
    if(!data) {
        postMarkup = <p>Loading post...</p>   
    }
    else {
        const {id, body, createdAt, username,userimg, comments, likes, likeCount, commentCount} = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image 
                        src={userimg}
                        size="small"
                        float="right" 
                        as={Link}
                        to={`/profile/${username}`}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header as={Link} to={`/profile/${username}`}>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description style={{fontWeight: 'bold',fontSize: 25, textColor:'black', "overflow":"hidden", "textOverflow": "ellipsis"}}>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id,likeCount,likes}} />
                                <MyPopup content="Comment on post">
                                    <Button as="div"
                                    labelPosition = "right"
                                    onClick={() => console.log('Comment on post')}>
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            {commentCount}
                                        </Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input type="text"
                                            placeholder="Comment.."
                                            name="comment"
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={commentInputRef}>
                                            </input>
                                            <button type="submit" 
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header as={Link} to={`/profile/${comment.username}`}>
                                        <Image src={comment.userimg} size="avatar"/>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta style={{marginTop:5}}>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description style={{fontWeight:"bold"}}>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      userimg
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        userimg
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;