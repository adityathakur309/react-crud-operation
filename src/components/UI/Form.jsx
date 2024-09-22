import { memo, useEffect, useState } from "react"
import { postData, updatePostData } from "../../api/GetPosts";



export const Form = memo(({ setPosts, updateDataApi, setUpdateDataApi }) => {
    let [post, setPost] = useState({
        title: "",
        body: "",
    })

    let [edit, setEdit] = useState(false);
    // change title input and body
    useEffect(() => {

        if (updateDataApi){
            setPost((prev) => {
                return { ...prev, title: updateDataApi.title || '', body: updateDataApi.body || "" }
            })
            setEdit(true)

        }
    }, [updateDataApi])
    // end 
    // handle input field
    const handleInputField = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPost((prev) => {
            return { ...prev, [name]: value }

        })



    }
    //end

    // add post 
    const addPost = async () => {
        try {
            let res = await postData(post);


            if (res.status === 201) {
                setPosts((prev) => {
                    return [...prev, res.data,]
                })
            }
        } catch (error) {
            console.log(error.message);



        }
    }
    // end 
    // update post 
    const updatePost = async () => {
        try {
            let res = await updatePostData(updateDataApi.id, post);

            if (res.status === 200) {
                setPosts((prev) => {
                    return prev.map((post) => {
                        if (post.id === res.data.id) {
                            return res.data;
                        }
                        else {
                            return post;

                        }
                    })
                })


            }


        } catch (error) {
            console.log(error.message);


        }

    }
    // end 
    // handle form Submit 
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        
        try {
            if (edit) {
                updatePost();
                setPost({title:"",body:""})
                setEdit(false);

                setPost({ title: "", body: "" });
            } else{
                addPost();
               
                
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };
    
    // end 

    return (
        <form action="" onSubmit={(event) => {
            event.preventDefault()
            if (post.title && post.body) {
                handleFormSubmit(event)
                setPost({ title: "", body: "" })

            }

        }}>
            <div className="flex bg-slate-300 p-2 rounded-md flex-wrap gap-3  mb-10">
                <input type="text" autoComplete="off" className="w-full basis-40 grow rounded-md p-2 outline-none border-none text-lg" placeholder="enter title" name="title" value={post.title} onChange={handleInputField} />
                <input type="text" autoComplete="off" className="w-full basis-40 grow rounded-md p-2 outline-none border-none text-lg" placeholder="body" name="body" value={post.body} onChange={handleInputField} />
                <button type="submit" className="px-4 py-2 cursor-pointer border-none basis-18 grow bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    {`${edit ? "edit" : "add"}`}
                </button>
            </div>
        </form>
    )
})