const _posts = [
    {
        text: "First post!",
        isLiked: true,
        likes: 11,
        id: "p1",
        comments: [
            {   id: "c1",
                text: "First comment on first post!",
                isLiked: true,
                likes: 9 
            },
            {   id: "c2", 
                text: "Second comment on first post!!",
                isLiked: true,
                likes: 1 },
            {   id: "c3", 
                text: "Third comment on first post!!!",
                isLiked: false,
                likes: 0 
            }
        ]
    },
    {
        text: "Aw man, I wanted to be first",
        isLiked: false,
        likes: 4,
        id: "p2",
        comments: [
            {   id: "c4", 
                text: "Don't wory second poster, you'll be first one day.",
                isLiked: false,
                likes: 2  
            },
            {   id: "c5", 
                text: "Yeah, believe in yourself!",
                isLiked: false,
                likes: 0  
            },
            {   id: "c6", 
                text: "Haha second place what a joke.",
                isLiked: true,
                likes: 1 
            }
        ]
    }
]