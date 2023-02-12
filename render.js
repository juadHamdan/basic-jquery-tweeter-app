const Renderer = function(){
    const renderPosts = function(posts, selector){
        $(selector).empty();

        for(let post of posts){
            let commentsDivs = ""
    
            for(let comment of post.comments){
                const commentDiv = `
                    <div class="comment" id=${comment.id}>
                        <div class="btn close-btn" onclick=deleteComment(event) data-post-id=${post.id} data-comment-id=${comment.id}>X</div>
                        ${comment.text}
                        <div class="likes">
                            <div class="like-icon" onclick="handleCommentLikeClick(event)" data-post-id=${post.id} data-comment-id=${comment.id}>
                                ${comment.isLiked ? '❤️' : '❤'}
                            </div>
                            <p>
                                ${comment.isLiked && comment.likes === 1 ? 'You liked this comment' : 
                                comment.likes !== 0 ? 
                                    comment.isLiked ? `You and ${comment.likes - 1} others liked this comment` : `${comment.likes} People liked this comment`
                                : 'no likes yet'}
                            </p>
                        </div>
                    </div>`
                commentsDivs += commentDiv
            }
            const commentsDiv = `
                <div class="comments">
                    <p>Comments:</p>
                    ${commentsDivs}
                    <form id=${post.id} class="comment-form" onsubmit="addComment(event)">
                        <div class="alert"></div>
                        <input type="text" placeHolder="Add Comment"/>
                        <button type="submit" class="btn">Comment</button>
                    </form>
                </div>`
    
            const postElement = $(`
                <div class="post" id=${post.id}>
                    <div class="btn close-btn" onclick="deletePost(event)" data-id=${post.id}>X</div>
                    <div class="likes">
                        <div class="like-icon" onclick="handlePostLikeClick(event)" data-id=${post.id}>
                            ${post.isLiked ? '❤️' : '❤'}
                        </div>
                        <p>
                            ${post.isLiked && post.likes === 1 ? 'You liked this tweet' : 
                            post.likes !== 0 ?
                            post.isLiked ? `You and ${post.likes - 1} others liked this tweet` : `${post.likes} People liked this tweet`
                            : 'no likes yet'}
                        </p>
                    </div>
                    <p>${post.text}</p><hr/>
                    ${commentsDiv}
                    <hr/>
                </div>`)
    
            $(selector).append(postElement)
        }
    }

    return{
        renderPosts
    }
}