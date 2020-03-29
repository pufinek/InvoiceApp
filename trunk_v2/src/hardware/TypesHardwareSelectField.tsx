import React, { useState, useEffect, useContext } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { UserContext } from '../UserContext';
import { HardwareType } from '../commonTypes';

interface ParametresDetail {
  isRequired: boolean;
  type: InputTypes;
}

enum InputTypes {
  'text' = 0,
  'number' = 1,
  'boolean' = 2,
  'date' = 3,
}

interface SelectFieldProps {
  error?: string | boolean;
  value?: string | number | null;
  onChange: (type?: HardwareType) => void;
}

function renderItems(types: HardwareType[] = []) {
  return types.map(item => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  ));
}

export default function TypesHardwareSelectField(props: SelectFieldProps) {
  const { user } = useContext(UserContext);
  const [types, setTypes] = useState([]);

  // useEffect(() => {
  //   async function getHardware() {
  //     const types = await fetch('/api/hardware/types', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user!.token}`,
  //       },
  //       method: 'GET',
  //     })
  //       .then(data => data.json())
  //       .then(res => (res.types ? res.types : []));

  //     setTypes(types);
  //   }

  //   getHardware();
  // }, []); // eslint-disable-line

  function handleChange(
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void {
    const selectedId = e.target.value;
    const selectedType = types.find(({ _id: id }) => id === selectedId);

    props.onChange(selectedType);
  }

  return (
    <FormControl error={!!props.error} fullWidth>
      <InputLabel>Typ hardware</InputLabel>
      <Select
        name="type"
        // label="Typ hardware"
        value={props.value || -1}
        onChange={handleChange}
        fullWidth
        margin="none"
        required
      >
        <MenuItem value={-1} onChange={() => props.onChange()}>
          Vyberte
        </MenuItem>
        {renderItems(types)}
      </Select>
      <FormHelperText>{props.error}</FormHelperText>
    </FormControl>
  );
}
