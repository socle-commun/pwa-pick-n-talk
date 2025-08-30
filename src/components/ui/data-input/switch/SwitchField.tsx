import { 
  FormControlLabel,
  type FormControlLabelProps 
} from "@mui/material";
import { Box } from "@mui/material";

interface SwitchFieldProps extends Omit<FormControlLabelProps, "control"> {
  className?: string;
  sx?: any;
  control: React.ReactElement;
}

export default function SwitchField({
  className,
  sx,
  control,
  label,
  ...props
}: SwitchFieldProps) {
  return (
    <Box
      data-slot="field"
      className={className}
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: { x: 8, y: 1 },
        '& [data-slot="control"]': {
          gridColumnStart: 2,
          alignSelf: 'flex-start',
          mt: { sm: 0.5 },
        },
        '& [data-slot="label"]': {
          gridColumnStart: 1,
          gridRowStart: 1,
        },
        '& [data-slot="description"]': {
          gridColumnStart: 1,
          gridRowStart: 2,
        },
        '&:has([data-slot="description"]) [data-slot="label"]': {
          fontWeight: 'medium',
        },
        ...sx
      }}
    >
      <FormControlLabel
        control={control}
        label={label}
        labelPlacement="start"
        {...props}
        sx={{
          margin: 0,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      />
    </Box>
  );
}
