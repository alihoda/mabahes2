import React from "react";
import { Message as SemMessage } from "semantic-ui-react";

function Message({ header, content }) {
  return <SemMessage error header={header} content={content} />;
}

export default Message;
