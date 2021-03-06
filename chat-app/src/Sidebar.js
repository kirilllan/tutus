import React, { useState, useEffect } from 'react'
import "./sidebar.css";
import SidebarOption from "./SidebarOption";
import db from "./firebase";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecordRounded";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/DraftsOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

function Sidebar() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot => (
      setChannels(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }))
      )
    ))
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>chat rooms</h2>
          <h3>
            <FiberManualRecordIcon />
            account name
          </h3>
        </div>
        <CreateIcon />
      </div>
        <SidebarOption Icon={InsertCommentIcon} title="Threads" />
        <SidebarOption Icon={InboxIcon} title ="Mentions & reactions" />
        <SidebarOption Icon={DraftsIcon} title="Saved items" />
        <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
        <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
        <SidebarOption Icon={AppsIcon} title="Apps" />
        <SidebarOption Icon={FileCopyIcon} title="File browser" />
        <SidebarOption Icon={ExpandLessIcon} title="show less" />
        <hr />
        <SidebarOption Icon={ExpandMoreIcon} title="channels" />
        <hr />
        <SidebarOption Icon={AddIcon} title="add channel" addChannelOption  />

        {channels.map(channel => (
          <SidebarOption title={channel.name} id={channel.id} />
        ))}
    </div>
  )
}

export default Sidebar
