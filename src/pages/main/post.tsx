import React, { useEffect, useState } from "react";
import { Post as IPost } from "./Main";
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

const Post = (props: Props) => {

    const navigate = useNavigate()

    const [user] = useAuthState(auth)

    const [likes, setLikes] = useState<Like[] | null>(null)

    const { post } = props

    const likesRef = collection(db, 'likes')

    const LikesDoc = query(likesRef, where('postId', '==', post.id))

    const getLikes = async () => {
        const data = await getDocs(LikesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    const addLike = async () => {
        try {
            let newDoc:any

            if (!hasUserLiked) {
                newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id })
            }
        
            if (user && !hasUserLiked) {
                setLikes((prev) => 
                prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }] )
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef, 
                where('postId', '==', post.id),
                where('userId', '==', user?.uid)
            )
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, 'likes', likeId)
            await deleteDoc(likeToDelete)
        
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLikes()
    }, [])

  return (
    <div>
        <div className="title">
            <h1>{post.title}</h1>
        </div>
        <div className="body">
            <p>{post.description}</p>
        </div>
        <div className="footer">
            <p>@{post.username}</p>
            <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</> }</button>
            {likes && <p>Likes: {likes?.length}</p>}
        </div>
    </div>
  )
};

export default Post;
