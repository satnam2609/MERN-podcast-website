import React from "react";
import { Avatar, Badge, useMediaQuery } from "@mui/material";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setValues, setLoading }) => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const { admin } = useSelector((state) => state.Admin);
  const fileUploadAndResize = (e) => {
    let files = e.target.files; // 3
    let allUploadedFiles = values.image;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          1280,
          1920,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `http://localhost:4000/api/uploadimages`,
                { image: uri },
                {
                  headers: {
                    Authorization: `Bearer ${admin.token}`,
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles = res.data;

                setValues({ ...values, image: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    console.log(values);
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/removeimage",
        { public_id: id },
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);

        setValues({ ...values, image: {} });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="flex justify-center rounded-lg  mb-4"
        style={{
          width: isNonMobile ? "25vw" : "50vw",
          height: "50vh",
          objectFit: "contain",
        }}
      >
        {values.image && (
          <Badge
            key={values.image.public_id}
            badgeContent={"x"}
            color="secondary"
            sx={{
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => handleImageRemove(values.image.public_id)}
          >
            <Avatar
              alt={values.title}
              variant="square"
              src={values.image.url}
              sx={{
                width: isNonMobile ? "25vw" : "50vw",
                height: "50vh",
                objectFit: "contain",
              }}
            />
          </Badge>
        )}
      </div>
      <div className="row">
        <label className="rounded-lg bg-orange-600 py-2 pl-4 pr-4 text-slate-50 text-lg cursor-pointer">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
