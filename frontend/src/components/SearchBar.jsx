
import React from 'react';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = ({ query, setQuery }) => {
    return (
        <Box sx={{ maxWidth: 600, margin: '20px auto', display: 'flex', justifyContent: 'center' }}>
            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search by Title or Description"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;
