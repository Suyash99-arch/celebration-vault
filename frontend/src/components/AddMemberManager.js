/* ==========================================================
   ADD MEMBER MANAGER

   Handles:
   - Form rendering
   - Validation
   - API save
   - Navigation
========================================================== */


import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";
import { renderAddMemberForm } from "./AddMemberForm.js";





export function initializeAddMember(){


    const container =

        document.getElementById(
            "memberFormContainer"
        );



    if(!container)
        return;




    container.innerHTML =

        renderAddMemberForm();



    bindSave();

}





function bindSave(){


    const button =
        document.getElementById(
            "saveBtn"
        );

    if (!button) {
        return;
    }

    button.addEventListener("click", saveMember);


}







async function saveMember(){



    const data = collectFormData();




    if(!validate(data))

        return;





    const button =

        document.getElementById(
            "saveBtn"
        );



    button.disabled = true;

    button.innerHTML =
        "⏳ Saving...";



    try{


        const response =

            await api.post(
                "/save",
                data
            );



        showToast(

            response.data.message ||

            "Birthday Saved Successfully!",

            "success"

        );




        setTimeout(()=>{


            navigate(
                "dashboard"
            );


        },700);



    }


    catch(error){


        console.error(error);



        showToast(

            error.response?.data?.message ||

            "Unable to save birthday.",

            "error"

        );



        button.disabled=false;

        button.innerHTML =
            "💾 Save Birthday";


    }


}








function collectFormData(){



    return {


        name:getValue("name"),

        dob:getValue("dob"),

        gender:getValue("gender"),

        relationship:getValue("relationship"),

        phone:getValue("phone"),

        email:getValue("email"),

        address:getValue("address"),

        favorite_gift:getValue("favoriteGift"),

        favorite_color:getValue("favoriteColor"),

        notes:getValue("notes"),

        important:

            document.getElementById(
                "important"
            )?.checked || false


    };


}







function getValue(id){


    return document

        .getElementById(id)

        ?.value

        .trim()

        ||

        "";

}








function validate(data){



    if(!data.name || !data.dob){


        showToast(

            "Please enter Name and Date of Birth.",

            "error"

        );


        return false;


    }



    return true;


}