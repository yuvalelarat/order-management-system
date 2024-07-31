import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

FilterTabs.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function FilterTabs({ filters }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || filters[0].value;
  const [value, setValue] = useState(category);

  useEffect(() => {
    setValue(category);
  }, [category, searchParams]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          ".MuiTab-root": { color: (theme) => theme.palette.primary.text },
        }}
      >
        {filters.map((filter) => (
          <Tab
            key={filter.value}
            label={filter.label}
            value={filter.value}
            component={Link}
            to={`/?category=${filter.value}&sort=${
              searchParams.get("sort") || "Cost"
            }&order=${searchParams.get("order") || "down"}`}
            sx={{ textDecoration: "none", color: "inherit" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default FilterTabs;
