import React from 'react';
import { gql } from "apollo-boost"
import {useQuery} from 'react-apollo-hooks';
import Post from "../Components/Post";
import styled from "styled-components";
import Helmet from 'react-helmet/es/Helmet';

const FEED_QUERY = gql`
    {
        seeFeed {
            id
            location
            caption
            user {
                id
                userName
            }
            files {
                id
                url
            }
            likeCount
            isLiked
            comments {
                id
                text
                user {
                    id
                    userName
                }
            }
            createdAt
        }
    }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default () => {
    console.log(FEED_QUERY)
    const {data} = useQuery(FEED_QUERY);
    return (
        <Wrapper>
            <Helmet>
                <title>Feed | Prismagram</title>
            </Helmet>
            {
            data &&
            data.seeFeed &&
            data.seeFeed.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    files={post.files}
                    likeCount={post.likeCount}
                    isLiked={post.isLiked}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            ))}
        </Wrapper>
    )
}