import React, { useState } from "react";
import {Box, TextField, Typography, Checkbox, FormControlLabel, IconButton, InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
import { h4, h5, h6 } from "../../styles/typographyStyles";
import { inputStyles, helperTextRed, checkboxStyles } from "../../styles/inputStyles";
import { formatExpiry, formatCardNumber } from "../utils/formatters.jsx";

export default function PaymentForm({ step, cardName, setCardName, cardNumber, setCardNumber, expiry, setExpiry, cvv, setCvv, errors, icon3}) {
  const [saveCard, setSaveCard] = useState(false);
  const [showCvv, setShowCvv] = useState(false); 

  const handleFieldChange = (setter, field, formatter) => (e) => {
    const value = e.target.value;
    const formatted = formatter ? formatter(value) : value;
    setter(formatted);
    if (errors[field]) errors[field] = undefined;
  };

  return (
    <fieldset disabled={step !== 2} style={{ border: "none", padding: 0, margin: 0 }}>
      <Box sx={{ flex: 1, backgroundColor: "#fff", p: 3, borderRadius: 2, border: step === 2 ? "2px solid yellow" : "2px solid transparent",}}>
        {step !== 2 && (
          <Typography sx={{ ...helperTextRed, mb: 2 }}>
            Please complete Step 1 (Contact & Delivery) before entering payment details
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box component="img" src={icon3} alt="three" sx={{ width: 32, height: 32 }} />
          <Typography sx={{ ...h4 }}>Payment</Typography>
        </Box>

        <Typography sx={{ ...h5 }}>Detail card</Typography>

        <TextField
          id="cardName"
          fullWidth
          margin="normal"
          placeholder="Name of card holder"
          value={cardName}
          onChange={handleFieldChange(setCardName, "cardName")}
          error={!!errors.cardName}
          helperText={errors.cardName}
          sx={{ ...inputStyles }}
          slotProps={{ formHelperText: { sx: helperTextRed } }}
        />

        <TextField
          id="cardNumber"
          fullWidth
          margin="normal"
          placeholder="Credit card number"
          value={cardNumber}
          onChange={handleFieldChange(setCardNumber, "cardNumber", formatCardNumber)}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          sx={{ ...inputStyles }}
          slotProps={{ formHelperText: { sx: helperTextRed } }}
          inputProps={{ maxLength: 19 }}
        />

        <Box display="flex" gap={1} mt={1}>
          <TextField
            id="expiry"
            placeholder="Expire date (MM/YY)"
            value={expiry}
            onChange={handleFieldChange(setExpiry, "expiry", formatExpiry)}
            error={!!errors.expiry}
            helperText={errors.expiry}
            sx={{ ...inputStyles }}
            inputProps={{ maxLength: 5 }}
            slotProps={{ formHelperText: { sx: helperTextRed } }}
          />

          <TextField
            id="cvv"
            placeholder="CVV"
            type={showCvv ? "text" : "password"}   
            value={cvv}
            onChange={handleFieldChange(setCvv, "cvv", (val) =>
              val.replace(/\D/g, "").slice(0, 3)
            )}
            error={!!errors.cvv}
            helperText={errors.cvv}
            sx={{ ...inputStyles }}
            inputProps={{ maxLength: 3 }}
            slotProps={{ formHelperText: { sx: helperTextRed } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCvv((prev) => !prev)}
                    edge="end"
                  >
                    {showCvv ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
          }
          label="Save card for future use"
          sx={{ ...h6, ...checkboxStyles, mt: 1 }}
        />
      </Box>
    </fieldset>
  );
}

