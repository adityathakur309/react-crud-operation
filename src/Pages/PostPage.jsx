import { useEffect, useState } from "react"
import { getPosts } from "../api/GetPosts";
import { Posts } from "../components/UI/Posts";

export const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");





    let getPostsData = async () => {
        try {
            let data = await getPosts();
            setPosts(data)
            setLoading(false)

        } catch (error) {
            console.log(error.message);
            console.log(error.response.data);
            setLoading(false)
            setError(error.message)


        }


    }

    useEffect(() => {
        getPostsData();

    }, [])

    return (

        <section className="container py-16">
            {
                loading ? (
                    <div className="loader mx-auto my-5"></div>
                ) : error ? (
                    <h1>{error}</h1>
                ) : posts ? (
                    <Posts posts={posts} setPosts={setPosts} />
                ) : <h1>something went wrong</h1>
            }


        </section>

    )
}