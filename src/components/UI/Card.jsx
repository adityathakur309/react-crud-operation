import { memo } from "react";
import { deletePost} from "../../api/GetPosts";

export const Card = memo(({ post, posts, setPosts,updateDataApi,setUpdateDataApi }) => {
    let { title, body, id } = post;



    // delte post function
    const handleButtonClick = async (id) => {
        try {
            let res = await deletePost(id);
            if (res.status === 200) {
                let updatedData = posts.filter((post) => {
                    return post.id !== id
                })
                setPosts(updatedData)



            }


        } catch (error) {
            console.log("error status " + error.response.status);
            console.log("error message " + error.message);


        }
    }
    // end 
    return (
        <div className=" card basis-80 grow">
            <h2>{`${id}.`}</h2>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-4">
                {`${body.slice(0, 110)}.`}
            </p>
            <div className="flex gap-3">
                <button className="px-4 py-2 cursor-pointer border-none bg-green-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={() =>{
                    setUpdateDataApi((prev) =>{
                        return{...prev,post}
                    })
                    
                    
                }}>
                    edit
                </button>
                <button className="px-4 py-2 cursor-pointer border-none bg-red-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={() => {
                    handleButtonClick(id)
                }}>
                    delete
                </button>
            </div>

        </div>
    )
})