import React from 'react';
import "./message.css";
import {format} from "timeago.js";

export default function Message({message, own}) {
  return (
    <div className={ own ? "message own": "message"}>
        <div className='messageTop'>
            <img className="messageImg" src="https://www.fairtravel4u.org/wp-content/uploads/2018/06/sample-profile-pic.png" alt=""/>
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>
            {format(message.createdAt)}
        </div>
    </div>
  )
}
