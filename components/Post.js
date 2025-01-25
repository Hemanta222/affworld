import { getFirstLetters, getRandomColor } from "@/lib/helper";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useMemo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import { ExpandMore } from "@mui/icons-material";
const Post = ({ post }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const backColor = useMemo(() => getRandomColor(), []);
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: backColor }} aria-label="recipe">
            {getFirstLetters(post?.user?.name)}
          </Avatar>
        }
        title={
          <Typography sx={{ fontWeight: 600 }}>{post.user.name}</Typography>
        }
        subheader={moment(post.createdAt).format("ddd, MMM Do YYYY, h:mm:ss a")}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.imageURL ? post.imageURL : "/no-image.png"}
        alt={post.caption}
      />
      <CardActions disableSpacing sx={{ marginTop: "8px" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <SendOutlinedIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <BookmarkBorderOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Typography sx={{ padding: "1rem" }}>{post.caption}</Typography>
    </Card>
  );
};

export default Post;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));
