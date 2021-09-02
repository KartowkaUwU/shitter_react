import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import GetMe from '../functions/GetMe';
import PostsLoader from '../functions/PostsLoader';

import Header from '../pageComponents/Header';
import LeftSidebar from '../pageComponents/LeftSidebar';
import RightSidebar from '../pageComponents/RightSidebar';
import Post from '../pageComponents/Post';
import CommentsPart from '../pageComponents/postComponents/CommentsPart';
import CreatePostForm from '../pageComponents/postComponents/CreatePostForm';
import { useSelector } from 'react-redux';

function PostPage() {
    useEffect(() => {
        window.scroll(0,0)
    }, [])
    GetMe();
    const me = useSelector(state => state.me.me);
    const overlay = useSelector(state => state.overlay)
    const post = useSelector(state => state.posts.posts)
    const { post_id } = useParams();
    document.title = "Single Post";
    

    PostsLoader(post_id, 6)

    const [postWarningColor, setColor] = useState(0);
    const setColorFromChild = (c) => setColor(c)
    const colorFunc = (c) => {
        if(postWarningColor !== 0)setTimeout(() => setColor(0), 500)
        switch(c){
            case 0 : return "post"
            case 1 : return "post error"
            case 2 : return "post copy"
            default : return "post"
        }
    }
    
    return (
        <>              
            <div id="pageWrapper__Overlay" className={!overlay.overlayVisibility ? "" : "fixed"} style={!overlay.overlayVisibility ? {} : { top: -window.pageYOffset }}>
                <Header/>
                <main>
                    <div id="main">
                        <LeftSidebar/>
                            <div id="feed" className="feed_subscriptions">
                                {post.id >= 0 ? <>
                                        <div key={"p"+post.id}>  
                                            <div>
                                                <Post post={post} isPost={true} me={me} />
                                            </div>
                                            {me.id !== -1 ? 
                                                <div className={colorFunc(postWarningColor)}>
                                                    <CreatePostForm me={me} post={false} parentID={''} postID={post_id} setColor={setColorFromChild}/>
                                                </div>
                                            : ""}
                                            <CommentsPart isPost={true} me={me}/>
                                        </div>
                                </> : <div>Something went wrong</div>} 
                            </div>
                        {me.id !== -1 ? <RightSidebar /> : ""}
                    </div>
                </main>
            </div>
        </>
    )
}

export default PostPage
