import React, { useState } from "react";
import { Avatar, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import avatar from "../assets/user.png";
import moment from "moment";
import Reply from "./utils/Reply";

const Comment = ({ comment, blog }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <div
      className="flex bg-white/10 rounded-lg justify-between items-center w-full p-1"
      key={comment._id}
    >
      <div
        className=" w-full flex flex-col items-start justify-start space-y-5 p-1"
        key={comment._id}
      >
        <div className="flex justify-start w-full space-x-2 p-1">
          <Avatar sx={{ bgcolor: "orange" }} src={avatar}>
            {comment.author.slice(0, 1)}
          </Avatar>
          <div className="text-[#eeeeee] text-2xl font-bold">
            {comment.author}
          </div>
        </div>
        <span className="text-[#cdcaca] text-xl font-bold">{comment.text}</span>
        <p className="text-white">
          {moment(comment.date).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        {comment.subComments.length > 0 && (
          <div onClick={handleReplies}>
            {!showReplies ? (
              <p className="text-lg font-medium text-[#eeeeee] w-full cursor-pointer">
                {comment.subComments.length} reply
              </p>
            ) : (
              <p className="text-lg text-[#eeeeee] cursor-pointer">Replies</p>
            )}
          </div>
        )}
        {showReplies &&
          comment.subComments.length > 0 &&
          comment.subComments.map((sub) => {
            return <Comment comment={sub} />;
          })}
      </div>

      <button className="text-[#eeeeee]" onClick={handleReplyClick}>
        <Tooltip
          title="Reply"
          onClick={() => {
            return <Reply authorTo={comment.author} />;
          }}
        >
          <ReplyIcon className="cursor-pointer" />
        </Tooltip>
      </button>
      {showReplyForm && (
        <Reply
          authorTo={comment.author}
          blog={blog}
          handleClose={handleReplyClick}
        />
      )}
    </div>
  );
};

export default Comment;
