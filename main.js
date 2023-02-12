const tweeter = Tweeter()
const renderer = Renderer()

renderPosts()

function renderPosts(){
    renderer.renderPosts(tweeter.getPosts(), ".posts")
    renderer.renderPosts(tweeter.getTrendingPosts(), ".trending-posts")
}

const addPost = function(event){
    event.preventDefault()
    const postText = event.target[0].value
    const alertSelectors = ".post-form .alert"

    $(alertSelectors).empty();
    if(!postText){
        $(alertSelectors).text("Please enter tweet.")
        return
    }

    tweeter.addPost(postText)
    renderPosts()
}

const addComment = function(event){
    event.preventDefault()
    const commentText = event.target[0].value
    const postID = event.target.id
    const alertSelectors = `#${postID} .comment-form .alert`

    $(alertSelectors).css('visibility', 'hidden')
    if(!commentText){
        $(alertSelectors).text("Please enter comment.")
        $(alertSelectors).css('visibility', 'visible')
        return
    }

    tweeter.addComment(commentText, postID)
    renderPosts()
}

const displaySearchedPosts = (event) => {
    event.preventDefault()
    const searchText = event.target[0].value
    const alertSelector = ".search-posts-form .alert"

    $(alertSelector).css('visibility', 'hidden')
    if(!searchText){
        $(alertSelector).text("Please enter text.")
        $(alertSelector).css('visibility', 'visible')
        return
    }

    renderer.renderPosts(tweeter.getSearchedPosts(searchText), ".searched-posts")
}

const deletePost = function(event){
    const id = event.target.dataset.id

    tweeter.removePost(id)
    renderPosts()
}

const deleteComment = function(event){
    const postID = event.target.dataset.postId
    const commentID = event.target.dataset.commentId

    tweeter.removeComment(postID, commentID)
    renderPosts()
}

const handlePostLikeClick = function(event){
    const id = event.target.dataset.id
    const postIsLiked = tweeter.getPostIsLiked(id)
    
    postIsLiked ? tweeter.removePostLike(id) : tweeter.addPostLike(id)

    tweeter.setPostIsLiked(id, !postIsLiked)
    renderPosts()
}

const handleCommentLikeClick = function(event){
    const postID = event.target.dataset.postId
    const commentID = event.target.dataset.commentId
    const commentIsLiked = tweeter.getCommentIsLiked(postID, commentID)
    
    commentIsLiked ? tweeter.removeCommentLike(postID, commentID) : tweeter.addCommentLike(postID, commentID)

    tweeter.setCommentIsLiked(postID, commentID, !commentIsLiked)
    renderPosts()
}