/* ==========================================================
   ADD MEMBER FORM

   UI Component Only
========================================================== */


export function renderAddMemberForm(){


return `


<div class="form-grid">


${input("name","Full Name","text","Enter full name")}


${input("dob","Date of Birth","date","")}


${input("phone","Phone","text","Phone number")}


${input("email","Email","email","Email address")}



<div class="input-group">

<label>Gender</label>

<select id="gender">

<option value="">Select</option>

<option>Male</option>

<option>Female</option>

<option>Other</option>

</select>

</div>



<div class="input-group">

<label>Relationship</label>

<select id="relationship">

<option value="">Select</option>

<option>Father</option>

<option>Mother</option>

<option>Brother</option>

<option>Sister</option>

<option>Grandfather</option>

<option>Grandmother</option>

<option>Friend</option>

<option>Other</option>

</select>

</div>



${input("favoriteGift","Favourite Gift","text","Gift idea")}


${input("favoriteColor","Favourite Colour","text","Favourite colour")}




<div class="input-group full-width">

<label>

Address

</label>


<textarea

id="address"

rows="3"

placeholder="Home address"

></textarea>


</div>





<div class="input-group full-width">


<label>

Notes

</label>


<textarea

id="notes"

rows="4"

placeholder="Write something memorable..."

></textarea>


</div>



</div>



<div class="checkbox-row">


<label>


<input

id="important"

type="checkbox"

>


⭐ Mark as Important


</label>


</div>




<div class="button-row">


<button

id="saveBtn"

class="save-premium-btn"

>

💾 Save Birthday

</button>


</div>


`;

}







function input(id,label,type,placeholder){


return `


<div class="input-group">


<label>

${label}

</label>


<input

id="${id}"

type="${type}"

placeholder="${placeholder}"

>


</div>


`;

}