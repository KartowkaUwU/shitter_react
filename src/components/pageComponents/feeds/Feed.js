import Post from '../Post';

import { Link } from 'react-router-dom';
import { useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import CreatePostForm from '../postComponents/CreatePostForm';
import PostsLoader from '../../functions/PostsLoader';
import { useSelector } from 'react-redux'

function Feed({urlNum}) {
    
    const [startPos, setStartPos] = useState(0);
    const {loading, error, hasMore} = PostsLoader(startPos, urlNum);
    const { username } = useParams();

    const me = useSelector(state => state.me.me);
    const posts = useSelector(state => state.posts.posts)

    const observer = useRef();
    const tenthPost = useCallback(node => {
        if(loading) return;
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setStartPos(p => p + 15)
            }
        })
        if(node) observer.current.observe(node)
    }, [loading, hasMore])

    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)
    return (
        <div id="feed" className="feed_subscriptions">
            {me.id !== -1 && document.title === "Home" ? 
                <div className={postWarningColor === 0 ? "post" : "post error"}>
                    <CreatePostForm me={me} post={true} setColor={setColorFromChild}/> 
                </div> 
            : ""}   
            <div id="posts" style={document.title === username || document.title === "Bookmarks" ? {marginLeft: -16} : {marginLeft: 0}}>
                {posts.length === 0 ? <div>Nothing to show</div> : ""}
                {error ? <div>An error occured. Possible reasons: You've logged in from another device, servers might've gone down. Try logging out and logging back in.</div> : ""}
                {Array.from(posts).map((post, index) => (
                    <Link key={post.id} to={post.parent === undefined ? "/post/" + post.id : "/comment/" + post.id }>
                        {index === posts.length - 6 ?
                        <div key={post.id} ref={tenthPost}>
                            <Post post={post} isPost={true}  me={me}/>
                        </div>
                        :
                        <div key={post.id} >
                            <Post post={post} me={me} isBookmarked={post.is_booked} isPost={true} />
                        </div>
                    }
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default Feed