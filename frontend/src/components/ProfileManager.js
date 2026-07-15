/* ==========================================================
   PROFILE MANAGER

   Handles:
   - API loading
   - Profile state
   - Error handling
========================================================== */


import api from "../api/api.js";
import { renderProfileView } from "./ProfileView.js";
import { openDeleteModal } from "./DeleteModal.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";



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



    const deleteButton =
        document.getElementById(
            "deleteProfile"
        );

    if(editButton){
        editButton.addEventListener("click", async () => {
            const module = await import("./EditProfile.js");
            module.openEditProfile(person);
        });
    }

    if(deleteButton){
        deleteButton.addEventListener("click", () => {
            openDeleteModal(person.name, async () => {
                try {
                    const response = await api.delete(`/delete/${person.id}`);
                    if (response.data.success) {
                        showToast("Member deleted successfully.", "success");
                        navigate("members");
                    } else {
                        showToast(response.data.message || "Could not delete member.", "error");
                    }
                } catch (error) {
                    console.error(error);
                    showToast("Unable to delete member.", "error");
                }
            });
        });
    }




    if(editMode){


        editButton?.click();


    }


}