const Tweeter = function(){
    const _MIN_LIKES_FOR_TRENDING = 10
    let _numOfPosts = _posts.length
    let _numOfComments = _getNumOfComments()
    let _currentPostsIDNum = _numOfPosts
    let _currentCommentsIDNum = _numOfComments

    function _getNumOfComments(){
        let numOfComments = 0
        _posts.forEach(post => numOfComments += post.comments.length)

        return numOfComments
    }

    const _findIndexByID = function(arr, id){
        return arr.findIndex(obj => obj.id === id)
    }

    const _getPost = function(postID){
        return _posts[_findIndexByID(_posts, postID)]
    }

    const _getComments = function(postID){
        return _posts[_findIndexByID(_posts, postID)].comments
    }

    const _getComment = function(postID, commentID){
        const comments = _getComments(postID)

        return comments[_findIndexByID(comments, commentID)]
    }

    const getPosts = function(){
        return _posts
    }
    
    const getTrendingPosts = function(){
        return _posts.filter(post => post.likes >= _MIN_LIKES_FOR_TRENDING)
    }

    const getSearchedPosts = function(searchText){
        return _posts.filter(post => 
            post.text.toLowerCase().includes(searchText.toLowerCase()))
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
        _getComments(postID).push(newComment)
        _numOfComments += 1
    }

    const removeComment = function(postID, commentID){
        _getComments(postID).splice(_findIndexByID(_getComments(postID), commentID), 1)
        _numOfComments -= 1
    }

    const getPostIsLiked = function(postID){
        return _getPost(postID).isLiked
    }

    const setPostIsLiked = function(postID, isLiked){
        _getPost(postID).isLiked = isLiked
    }

    const getCommentIsLiked = function(postID, commentID){
        return _getComment(postID, commentID).isLiked
    }

    const setCommentIsLiked = function(postID, commentID, isLiked){
        _getComment(postID, commentID).isLiked = isLiked
    }

    const addPostLike = function(postID){
        _getPost(postID).likes += 1
    }

    const removePostLike = function(postID){
        _getPost(postID).likes -= 1
    }

    const addCommentLike = function(postID, commentID){
        _getComment(postID, commentID).likes += 1
    }

    const removeCommentLike = function(postID, commentID){
        _getComment(postID, commentID).likes -= 1
    }

    return {
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