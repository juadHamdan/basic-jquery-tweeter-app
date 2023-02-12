const tweeter = Tweeter()
const renderer = Renderer()

const postsObject = $(".posts")
const trendingPostsObject = $(".trending-posts")
const searchedPostsObject = $(".searched-posts")

renderPosts()

function renderPosts(){
    renderer.renderPosts(tweeter.getPosts(), postsObject)
    renderer.renderPosts(tweeter.getTrendingPosts(), trendingPostsObject)
}

const addPostAlertObject = $(".post-form .alert")
const addPost = function(event){
    event.preventDefault()
    const postText = event.target[0].value

    addPostAlertObject.empty();
    if(!postText){
        addPostAlertObject.text("Please enter tweet.")
        return
    }

    tweeter.addPost(postText)
    event.target[0].value = ""
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

const searchPostAlertObject = $(".search-posts-form .alert")
const displaySearchedPosts = (event) => {
    event.preventDefault()
    const searchText = event.target[0].value

    searchPostAlertObject.css('visibility', 'hidden')
    if(!searchText){
        searchPostAlertObject.text("Please enter text.")
        searchPostAlertObject.css('visibility', 'visible')
        return
    }

    event.target[0].value = ""
    renderer.renderPosts(tweeter.getSearchedPosts(searchText), searchedPostsObject)
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