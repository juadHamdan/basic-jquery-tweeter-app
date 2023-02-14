const Renderer = function(){
    const _LIKED_TYPE = {
        POST: "tweet",
        COMMENT: "comment"
    }

    const _getlikeStr = function(LikedType, isLiked, likes){
        const onlyYouLiked = (isLiked && likes === 1)
        const youAndOthersLiked = (isLiked && likes > 1)
        const onlyOthersLiked = (!isLiked && likes > 0)
        const noLikes = (likes === 0)

        if(onlyYouLiked){
            return `You liked this ${LikedType}`
        }
        if(youAndOthersLiked){
            return `You and ${likes - 1} others liked this ${LikedType}`
        }
        if(onlyOthersLiked){
            return `${likes} People liked this ${LikedType}`
        }
        if(noLikes){
            return 'no likes yet'
        }

        return ''
    }

    const _getCommentsElements = function(comments, postID){
        let commentsElements = ""
    
        for(let comment of comments){
            const commentElement = `
                <div class="comment" id=${comment.id}>
                    <div class="btn close-btn" onclick=deleteComment(event) data-post-id=${postID} data-comment-id=${comment.id}>X</div>
                    ${comment.text}
                    <div class="likes">
                        <div class="like-icon" onclick="handleCommentLikeClick(event)" data-post-id=${postID} data-comment-id=${comment.id}>
                            ${comment.isLiked ? '❤️' : '❤'}
                        </div>
                        <p>${_getlikeStr(_LIKED_TYPE.COMMENT, comment.isLiked, comment.likes)}</p>
                    </div>
                </div>`

            commentsElements += commentElement
        }

        return commentsElements
    }

    const renderPosts = function(posts, jQueryObject){
        jQueryObject.empty();

        for(let post of posts){
            const postObject = $(`
                <div class="post" id=${post.id}>
                    <div class="btn close-btn" onclick="deletePost(event)" data-id=${post.id}>X</div>
                    <div class="likes">
                        <div class="like-icon" onclick="handlePostLikeClick(event)" data-id=${post.id}>
                            ${post.isLiked ? '❤️' : '❤'}
                        </div>
                        <p>${_getlikeStr(_LIKED_TYPE.POST, post.isLiked, post.likes)}</p>
                    </div>
                    <p>${post.text}</p>
                    <hr/>
                    <div class="comments">
                        <p>Comments:</p>
                        ${_getCommentsElements(post.comments, post.id)}
                        <form id=${post.id} class="comment-form" onsubmit="addComment(event)">
                            <div class="alert"></div>
                            <input type="text" placeHolder="Add Comment"/>
                            <button type="submit" class="btn">Comment</button>
                        </form>
                    </div>
                    <hr/>
                </div>`)
    
            jQueryObject.append(postObject)
        }
    }

    return{
        renderPosts
    }
}