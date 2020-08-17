import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import { connect } from "react-redux";
import { fetchInfoPosts } from "../actions/infoPostAction";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: "40px auto 0 auto",
    maxWidth: "500px",
    color: "#f7eaea",
    padding: "0 15px 80px 15px",
  },
  header: {
    "& .header__details": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    marginBottom: "10px",
    "& .header__details-social-item": {
      marginRight: "10px",
    },
  },
  image: {
    "& .image__img": {
      width: "100%",
    },
  },
  content: {
    fontSize: "18px",
    "& .content__subtitle": {
      marginTop: "40px",
    },
  },
});

const PostPage = ({ dispatch, info, loading, hasErrors }) => {
  const classes = useStyles();
  const { id } = useParams();
  const { name, status, species, type, gender, image, origin } = info;
  let values = [];

  for (var key in origin) {
    values.push(origin[key]);
  }

  const nameOrigin = values[0];

  const style = {
    color: "white",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(() => {
    dispatch(fetchInfoPosts(id));
  }, [dispatch, id]);

  const renderInfoPosts = () => {
    if (loading) return <p style={style}>Cargando información...</p>;
    if (hasErrors) return <p style={style}>Posts no disponibles...</p>;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className="header__title">
            <h1>{name}</h1>
          </div>
          <div className="header__details">
            <div className="header__details-avatar">
              <Avatar>
                <PersonIcon style={{ color: "blue" }} />
              </Avatar>
            </div>
            <div className="header__details-social">
              <TwitterIcon
                fontSize="large"
                className="header__details-social-item"
              />
              <LinkedInIcon
                fontSize="large"
                className="header__details-social-item"
              />
              <FacebookIcon
                fontSize="large"
                className="header__details-social-item"
              />
            </div>
          </div>
        </div>
        <div className={classes.image}>
          <img className="image__img" src={image} alt="" />
        </div>
        <div className={classes.content}>
          <p>Status: {status}</p>
          <p>Species: {species}</p>
          <p>Type: {type || "N/A"}</p>
          <p>Gender: {gender}</p>
          <p>Origen: {nameOrigin}</p>
        </div>
      </div>
    );
  };

  return renderInfoPosts();
};
const mapStateToProps = (state) => ({
  loading: state.info.loading,
  info: state.info.info,
  hasErrors: state.info.hasErrors,
});

export default connect(mapStateToProps)(PostPage);
