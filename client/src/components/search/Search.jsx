import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgb(23 23 23)",
  border: "2px solid transparent",
  borderRadius: "1.5rem",
  boxShadow: 24,
  p: 2,
  display: "flex",
  gap: "10px",
  ouline: "none",
  width: "80%",
};

const Search = ({ open, handleOpen, search, handleSearchChange }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <SearchOutlined
              className="text-white cursor-pointer"
              onClick={() => {
                navigate(`/blogs/filter/${search}`);
                handleOpen();
              }}
            />
            <input
              type="search"
              className="bg-transparent outline-none text-white"
              value={search}
              placeholder="Search anything "
              onChange={handleSearchChange}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Search;
