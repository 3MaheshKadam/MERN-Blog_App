import React from 'react'
import { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'

// Syncing with URL Parameters: React Router updates the postSlug parameter in the URL when navigating between different posts.
//  By including postSlug in the dependency array, the effect will re-run whenever the URL changes, 
// ensuring that the component always displays the correct post corresponding to the updated URL.
const PostPage = () => {
    const {postSlug}=useParams();
    const [loading ,setLoading]=useState(true);
    const [error ,setError] =useState(false);
    const [post ,setPost]=useState(null);
    console.log(post);
    useEffect(()=>{

        const fetchPost = async()=>{
            try{
                setLoading(true);
                const res =await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    setPost(data.posts[0]); //from post controller we get all teh posts and so post[0] will be teh one we've clicked on
                    setLoading(false);
                    return;
                }
            }
            catch(error){
                setError(true);
                setLoading(false);
            }
        } 
        fetchPost();//it will initialize the requst
    },[postSlug]); //update with chnge in slug(by clicking on other post)
    if(loading)return <div>Loading...</div>;
  return (
    <p>PostPage</p>
  )
}

export default PostPage