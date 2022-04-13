import gql from "graphql-tag";
import React, {useContext} from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import {Button, Card, Icon, Label,Image} from 'semantic-ui-react';
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import { useHistory } from "react-router-dom";

function SinglePost(props) {

    const history = useHistory();
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    function deletePostCallback() {
        history.push('/');
    }
    
    let postMarkup;
    if(!data) {
        postMarkup = <p>Loading post...</p>   
    }
    else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image 
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size="small"
                        float="right" />
                    </Grid.Column>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton user={user} post={{id,likeCount,likes}} />
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
                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={deletePostCallback} />
                            )}
                        </Card.Content>
                    </Card>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;