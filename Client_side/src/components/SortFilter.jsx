import { useState } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SortFilter({ filters }) {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const [selectedSort, setSelectedSort] = useState(sort || "Cost");
  const [isUp, setIsUp] = useState(searchParams.get("order") === "up");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setSelectedSort(newValue);
    navigate(`/?sort=${newValue}&category=הכל&order=down`);
    setIsUp(false);
  };

  const handleSwitchChange = () => {
    setIsUp((prev) => {
      const newOrder = !prev ? "up" : "down";
      navigate(
        `/?sort=${searchParams.get("sort") || filters.at(-1).value}&category=${
          searchParams.get("category") || "הכל"
        }&order=${newOrder}`
      );
      return !prev;
    });
  };

  // console.log("Current search params:", Array.from(searchParams.entries()));

  return (
    <Box
      sx={{
        width: {
          xs: "85%", // small screens
          sm: "70%", // medium screens
          md: "50%", // good value
          lg: "40%", // large screens
          xl: "30%", // good value
        },
        margin: "0.8rem auto",
        padding: {
          xs: "0.5rem",
          sm: "1rem",
        },
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        display: "flex",
        alignItems: "center",
        flexWrap: {
          xs: "wrap", // wrap on small screens
          md: "nowrap", // no wrap on medium and larger screens
        },
      }}
    >
      <IconButton onClick={handleSwitchChange} color="secondary">
        {isUp ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
      <Tabs
        value={selectedSort}
        onChange={handleChange}
        indicatorColor="none"
        textColor="secondary"
        centered
        sx={{
          flexGrow: 1,
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
            flexWrap: {
              xs: "wrap", // wrap on small screens
              md: "nowrap", // no wrap on medium and larger screens
            },
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {filters.map((filter) => (
          <Tab
            key={filter.value}
            label={
              <Link
                to={`/?sort=${filter.value}&category=הכל&order=${
                  isUp ? "up" : "down"
                }`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {filter.label}
              </Link>
            }
            value={filter.value}
            sx={{
              color: theme.palette.secondary.text,
              width: "auto",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              flexBasis: {
                xs: "50%", // half width on small screens
                md: "auto", // auto width on medium and larger screens
              },
              "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
              },
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default SortFilter;

SortFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
