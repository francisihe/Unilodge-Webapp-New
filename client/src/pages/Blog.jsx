import { Link } from "react-router-dom"
import BlogCardMini from "../components/UIelements/BlogCardMini"
import { useEffect, useState } from "react"


const Blog = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {

        const getBlogs = async () => {
            const res = await fetch(`/api/v1/blogs/all`)
            const data = await res.json()
            setBlogs(data.blogs)
        };
        getBlogs();

        window.scroll({
            top: 0,
            behavior: 'smooth'
        });

    }, []);

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl lg:px-8">
                <div className="mx-auto max-w-4xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-orange-600">Our Blog</h2>
                    <p className="mt-2 text-3xl font-bold tracking-normal text-gray-900 sm:text-4xl">
                        Stay up to date with our latest news and updates
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We regularly publish updates to our blog to keep you posted on the most recent happenings in the real estate industry.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 md:py-8 lg:max-w-screen-xl lg:mx-auto lg:max-h-screen">

                {blogs && blogs.map((post) => (
                    <Link key={post.id} to={`/blog/${post?.slug}`}>
                        <BlogCardMini key={post.id} post={post} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blog