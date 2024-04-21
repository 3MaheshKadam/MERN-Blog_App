import React from 'react'
import { Button, Spinner } from 'flowbite-react';
import { useEffect ,useState} from 'react'
import { Link, useParams} from 'react-router-dom'

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
    

    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
    <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
    <Button color='gray' pill size='xs'>{post && post.category}</Button>
    </Link>
    <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length /1000).toFixed(0)} mins read</span>
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>

    </div>
  </main>;
}
export default PostPage
