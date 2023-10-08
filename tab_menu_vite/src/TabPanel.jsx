import React from 'react';

/* Components*/
import TodoInputAndTable from './TodoInputAndTable';

/* Navigation */
import { Tabs, Tab, Typography } from '@mui/material';

export default function TabPanel(props) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="HOME" />
        <Tab value="two" label="TO-DOs" />
      </Tabs>
      {value === 'one' && (
        <Typography variant="h4" sx={{ padding: '20px' }} gutterBottom>
          Welcome to home page
        </Typography>
      )}
      {value === 'two' && (
        <div>
          <Typography variant="h4" sx={{ padding: '20px' }} gutterBottom>
            Add new task
          </Typography>{' '}
          <TodoInputAndTable />
        </div>
      )}
    </div>
  );
}
