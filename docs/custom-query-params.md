# Custom Query Parameters

The giving website supports a handful of custom query parameters that provide various additional functionality to users who wish to leverage them.


Parameter | Scope | Description | Validation
---------|----------|---------|---------
 `allocation_code` | root | Used in place of the fund page path/slug, redirects to fund page if one with provided allocation code exists and is active. If part of a query string, additional parameters should be retained upon redirect.<br /><br />**Use Case:** For mass email solicitation, link each donor to fund of most recent gift using Advance data and custom script. | Value must be 7 digits (6 real numbers + leading zero).<br />✅ : `allocation_code=0221052`<br />❌ :  `allocation_code=221052`
 `amount` | fund page | On fund pages only, "Suggested Amount" is enabled and amount is populated by param value. If Suggested Amount is already enabled, the amount is overwritten with the param value.<br /><br />**Use Case:** Solicit class of 2022 to make a gift of $20.22 to alumni scholarship fund. | Value:<br />- can be any whole number or float (2 decimal places)<br />- should be less than 25000 (current per-transaction limit)<br />- cannot contain commas or special characters<br />✅ : `amount=20.22`<br />❌ :  `amount=$20`
 `appeal_code` | global | Can be added to any giving.cu.edu path or query string. Site captures and stores with session, then stores in field when user takes action to generate a new Donation record.<br /><br />**Use Case:** Staff want to link gifts in source system to a specific appeal or campaign for tracking/reporting. | Accepts any string<br />✅ : `giving.cu.edu?appeal_code=G1234`<br />❌ :  `colorado.edu?appeal_code=G1234`
 `recurring` | fund page | On fund pages only, automatically enables "Make this a recurring gift" and sets recurring schedule based to param's value.<br /><br />**Use Case:** UCCS wants to promote monthly recurring gifts as part of a campaign. | Value must be "monthly", "quarterly", or "annually" (all lowercase)<br />✅ : `recurring=monthly`<br />❌ :  `recurring=Monthly`<br />❌ :  `recurring=daily`
