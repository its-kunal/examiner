import  { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Input, Tooltip } from "@mui/material";
import { createAvatar } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import BadgeIcon from "@mui/icons-material/Badge";
import KeyIcon from "@mui/icons-material/Key";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
export default function Profile() {
  const [imgPath, setImgPath] = useState("");
  const avatar = createAvatar(notionists, {
    seed: "artist",
  });
  useEffect(() => {
    avatar.toDataUri().then((v) => {
      setImgPath(v);
    });
  }, []);
  return (
    <>
      <div className="h-10"></div>

      <div className="max-w-5xl mx-auto flex gap-x-4">
        {/* Image Avatar */}
        <div className="w-1/4 flex justify-center border border-transparent border-r-gray-400">
          <Avatar
            sx={{ width: 100, height: 100, backgroundColor: "lightgrey" }}
            src={imgPath}
          ></Avatar>
        </div>
        <div className="w-10"></div>
        {/* Student Details */}

        <div className="w-2/4 flex flex-col gap-y-2">
          <Input
            startAdornment={
              <Tooltip title="Name">
                <PersonIcon sx={{ mr: 2 }}></PersonIcon>
              </Tooltip>
            }
            endAdornment={
              <IconButton>
                <CreateIcon></CreateIcon>
              </IconButton>
            }
            placeholder="Name"
            fullWidth
          ></Input>
          <Input
            startAdornment={
              <Tooltip title="Roll Number">
                <BadgeIcon sx={{ mr: 2 }} />
              </Tooltip>
            }
            endAdornment={
              <IconButton disabled>
                <CreateIcon></CreateIcon>
              </IconButton>
            }
            placeholder="Roll No"
            fullWidth
          ></Input>
          <Input
            startAdornment={
              <Tooltip title="Password">
                <KeyIcon sx={{ mr: 2 }} />
              </Tooltip>
            }
            endAdornment={
              <IconButton disabled>
                <CreateIcon></CreateIcon>
              </IconButton>
            }
            placeholder="Password"
            fullWidth
            type="password"
          ></Input>
          <Input
            startAdornment={
              <Tooltip title="Email">
                <AlternateEmailIcon sx={{ mr: 2 }} />
              </Tooltip>
            }
            endAdornment={
              <IconButton>
                <CreateIcon></CreateIcon>
              </IconButton>
            }
            placeholder="Email"
            fullWidth
          ></Input>
          <div className="h-5"></div>
          <Button disabled variant="contained" sx={{ width: 100, mx: "auto" }}>
            Save
          </Button>
        </div>
      </div>

      <div className="h-10"></div>
    </>
  );
}
