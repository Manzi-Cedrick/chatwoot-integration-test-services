import { useState } from "react";
import { Tooltip, ButtonBase, IconButton, Box } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import fetch from "../../lib/functions/fetch";
import { articleInterface } from "@/@types/article";
import SimpleSnackbar from "./Snackbar";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import { customArticleInterface } from "@/@types/custom_article";

export type BookmarkButtonProps = {
    post?: articleInterface;
    opinion?: customArticleInterface;
};

/**
 * Component BookmarkButton adds and deletes a bookmark
 * @param   {BookmarkButtonProps}
 * @return  {JSX.Element}  Bookmark Icon Button
 */

const BookmarkButton = ({
    post,
    opinion,
}: BookmarkButtonProps): JSX.Element => {
    const [isActive, setActive] = useState(false);
    const [color, setColor] = useState("info");
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState("");
    const { mutate } = useSWRConfig();

    let id = post ? post?._id : opinion?._id;
    let content_type = post ? "article" : "opinion";
    // get user session
    const { data: session, status } = useSession();
    //console.log(session);
    // get user's bookmarks ids
    const userBookmarkIds = session?.user?.follows?.opinions?.concat(
        session?.user?.follows?.articles
    );
    const toggleBookmark = () => {
        setActive(!isActive);
    };

    if (status === "unauthenticated") return <></>;
    const handleBookmark = async () => {
        try {
            //@ts-ignore
            if (!isActive && !userBookmarkIds?.includes(id)) {
                // was post?._id
                const res = await fetch(
                    `/api/user/follows/bookmarks/${id}?contentType=${content_type}`,
                    {
                        method: "POST",
                        body: "",
                    }
                );

                // console.log(res);
                //refetch data
                mutate("/api/user/follows/bookmarks");
                setColor("success");
                setOpenSnack(true);
                setMessage(res.message);
            } else {
                const res = await fetch(`/api/user/follows/bookmarks/${id}`, {
                    method: "DELETE",
                    body: "",
                });
                //refetch data
                mutate("/api/user/follows/bookmarks");
                setColor("info");
                setOpenSnack(true);
                setMessage(res.message);
            }
        } catch (err) {
            setColor("error");
            setOpenSnack(true);
            setMessage("Error. Bookmark wasn't saved.");
            console.log(err);
        }
    };

    return (
        <Box display="inline-block">
            <Tooltip title="Bookmark it">
                <IconButton
                    aria-label="add to bookmark"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark();
                        handleBookmark();
                    }}
                >
                    <BookmarkIcon
                        className={
                            //@ts-ignore
                            isActive || userBookmarkIds?.includes(id) // was post?_id
                                ? "bookmarked action_btn"
                                : "action_btn"
                        }
                        sx={{
                            color: "text.secondary",
                            fontSize: "1.2rem",
                        }}
                    />
                </IconButton>
            </Tooltip>
            <SimpleSnackbar
                openSnack={openSnack}
                setOpenSnack={setOpenSnack}
                message={message}
                color={color}
            />
        </Box>
    );
};

export default BookmarkButton;