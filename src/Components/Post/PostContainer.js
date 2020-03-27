import React, {useState} from 'react';
import PostPresenter from './PostPresenter';
import useInput from '../../hooks/useInput';
import * as PropTypes from 'prop-types';
import {useMutation} from 'react-apollo-hooks';
import {ADD_COMMENT, TOGGLE_LIKE} from './PostQueries';
import { toast } from "react-toastify";

const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    const addCommentMutation = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    const toggleLike = () => {
        toggleLikeMutation();
        if (isLikedS === true) {
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
        }
    };

    const onKeyPress = async event => {
        const { which } = event;
        if (which === 13) {
            event.preventDefault();
            try {
                const {
                    data: { addComment }
                } = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
                comment.setValue("");
            } catch {
                toast.error("Cant send comment");
            }
        }
    };

    return (
        <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
        />
    )
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

export default PostContainer