import { Link } from "react-router-dom";
import BlogCardMini from "../UIelements/BlogCardMini";
import { useEffect, useState } from "react";

const RecentBlogs = () => {

    const [latestBlogs, setLatestBlogs] = useState([])

    useEffect(() => {

        const getRecentBlogs = async () => {
            const res = await fetch(`/api/v1/blogs/latest`)
            const data = await res.json()
            setLatestBlogs(data.blogs)
        };
        getRecentBlogs();
    }, []);

    return (
        <div className="pt-10 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen">
            <div className='flex justify-between items-baseline pb-6'>
                <div className='pr-4'>
                    <h2 className='text-3xl py-2 leading-tight flex-wrap'>Recent Posts</h2>
                    <p className='text-md pb-2 -mr-28 flex-wrap pt-5'>We regularly publish updates to our blog to keep you posted on the most recent happenings in the real estate industry. </p>
                </div>

                <Link to='/blog'><button className='bg-orange-400 py-2 px-3 rounded-md font-medium mr-4 md:mb-2 shadow-lg hover:scale-110 transition-transform whitespace-nowrap'>Visit Our Blog</button></Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {latestBlogs && latestBlogs.map((post) => (
                    <Link key={post.id} to={`/blog/${post?.slug}`} >
                        <BlogCardMini key={post.id} post={post} />
                    </Link>
                ))}
            </div>

        </div>

    )
}

export default RecentBlogs