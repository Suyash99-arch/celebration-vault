/* ==========================================================
   PROFILE MANAGER

   Handles:
   - API loading
   - Profile state
   - Error handling
========================================================== */


import api from "../api/api.js";
import { renderProfileView } from "./ProfileView.js";



export async function loadProfile(
    profileId,
    editMode=false
){


    const container =

        document.getElementById(
            "profileContent"
        );



    if(!container)
        return;




    container.innerHTML = `


    <div class="profile-loading">


        <div class="loader"></div>


        <p>

            Loading profile...

        </p>


    </div>


    `;



    try{


        const response =

            await api.get(
                `/profile/${profileId}`
            );



        const person =

            response.data.profile;



        container.innerHTML =

            renderProfileView(
                person
            );



        initializeActions(
            person,
            editMode
        );



    }


    catch(error){


        console.error(error);



        container.innerHTML = `


        <div class="empty-card">


            ❌ Profile not found


        </div>


        `;


    }


}






function initializeActions(
    person,
    editMode
){


    const editButton =

        document.getElementById(
            "editProfile"
        );



    if(editButton){


        editButton.onclick = ()=>{


            import("./EditProfile.js")

            .then(module=>{


                module.openEditProfile(
                    person
                );


            });


        };


    }




    if(editMode){


        editButton?.click();


    }


}