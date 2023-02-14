const Tweeter = function(){
    const _MIN_LIKES_FOR_TRENDING = 10
    let _numOfPosts = _posts.length
    let _numOfComments = getNumOfComments()
    let _currentPostsIDNum = _numOfPosts
    let _currentCommentsIDNum = _numOfComments

    function getNumOfComments(){
        let numOfComments = 0
        _posts.forEach(post => numOfComments += post.comments.length)

        return numOfComments
    }

    const _findIndexByID = function(arr, id){
        return arr.findIndex(obj => obj.id === id)
    }

    const getPosts = function(){
        return _posts
    }

    const getPost = function(postID){
        return _posts[_findIndexByID(_posts, postID)]
    }

    const getComments = function(postID){
        return _posts[_findIndexByID(_posts, postID)].comments
    }

    const getComment = function(postID, commentID){
        const comments = getComments(postID)

        return comments[_findIndexByID(comments, commentID)]
    }

    const getTrendingPosts = function(){
        return _posts.filter(post => post.likes >= _MIN_LIKES_FOR_TRENDING)
    }

    const addPost = function(postText){
        const postID = `p${_currentPostsIDNum + 1}`
        _currentPostsIDNum += 1;

        let newPost = {
            text: postText,
            isLiked: false,
            likes: 0,
            id: postID,
            comments: []
        }
        _posts.push(newPost)
        _numOfPosts += 1
    }

    const removePost = function(postID){
        _posts.splice(_findIndexByID(_posts, postID), 1)
        _numOfPosts -= 1
    }

    const addComment  = function(commentText, postID){
        const commentID = `c${_currentCommentsIDNum + 1}`
        _currentCommentsIDNum += 1;

        let newComment = {
            id: commentID,
            text: commentText,
            isLiked: false,
            likes: 0
        }
        getComments(postID).push(newComment)
        _numOfComments += 1
    }

    const removeComment = function(postID, commentID){
        getComments(postID).splice(_findIndexByID(getComments(postID), commentID), 1)
        _numOfComments -= 1
    }

    const getSearchedPosts = function(searchText){
        return _posts.filter(post => 
            post.text.toLowerCase().includes(searchText.toLowerCase()))
    }

    const getPostIsLiked = function(postID){
        return getPost(postID).isLiked
    }

    const setPostIsLiked = function(postID, isLiked){
        getPost(postID).isLiked = isLiked
    }

    const getCommentIsLiked = function(postID, commentID){
        return getComment(postID, commentID).isLiked
    }

    const setCommentIsLiked = function(postID, commentID, isLiked){
        getComment(postID, commentID).isLiked = isLiked
    }

    const addPostLike = function(postID){
        getPost(postID).likes += 1
    }

    const removePostLike = function(postID){
        getPost(postID).likes -= 1
    }

    const addCommentLike = function(postID, commentID){
        getComment(postID, commentID).likes += 1
    }

    const removeCommentLike = function(postID, commentID){
        getComment(postID, commentID).likes -= 1
    }

    return {
        getPost,
        getPosts,
        getSearchedPosts,
        getTrendingPosts,
        addPost,
        removePost,
        addComment,
        removeComment,
        getPostIsLiked,
        setPostIsLiked,
        getCommentIsLiked,
        setCommentIsLiked,
        addPostLike,
        removePostLike,
        addCommentLike,
        removeCommentLike
    }
}