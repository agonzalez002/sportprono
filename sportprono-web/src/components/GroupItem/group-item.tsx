import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emptyFile from "../../assets/images/empty-file.png";
import { GroupType } from "../../interfaces";
import { StyledBox } from "./StyledGroupItem";

interface TypeGroup {
  group: GroupType;
}

function GroupItem({ group }: TypeGroup) {
  const [imageUrl, setImageUrl] = useState<string>(emptyFile);
  const navigate = useNavigate();

  useEffect(() => {
    if (group && group.image) {
      setImageUrl(group.image_url);
    }
  }, [group]);

  const handleGroupDetail = () => {
    navigate(`/details/${group.id}`);
  };

  return (
    <>
      {group && (
        <>
          <StyledBox onClick={handleGroupDetail}>
            <Avatar
              alt={group.name}
              src={imageUrl}
              sx={{ width: 70, height: 70 }}
            />
            <h2>{group.name}</h2>
          </StyledBox>
        </>
      )}
    </>
  );
}

export default GroupItem;
