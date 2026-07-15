/* ==========================================================
   MEMBERS MANAGER
   Handles Family Directory Logic

   Responsibilities:
   - Fetch members
   - Search
   - Sorting
   - Statistics
   - Rendering cards
   - Events
========================================================== */


import api from "../api/api.js";
import { showToast } from "./Toast.js";
import { navigate } from "../router/router.js";
import { openDeleteModal } from "./DeleteModal.js";
import { MemberCard } from "./common/MemberCard.js";



/* ==========================================================
   STATE
========================================================== */


let members = [];

let filteredMembers = [];

let currentSort = "upcoming";




/* ==========================================================
   LOAD MEMBERS
========================================================== */


export async function loadMembers(){


    try{


        showLoading();



        const response = await api.get(
            "/birthdays"
        );



        members =

            response.data.birthdays || [];



        filteredMembers = [

            ...members

        ];



        updateStatistics(
            members
        );



        renderMembers(
            filteredMembers
        );



        initializeSearch();

        initializeSorting();

        initializeActions();



    }


    catch(error){


        console.error(
            "Members loading failed:",
            error
        );



        showToast(
            "Unable to load family members",
            "error"
        );



        showError();



    }


}






/* ==========================================================
   SORTING
========================================================== */


function sortMembers(data){


    const sorted = [

        ...data

    ];



    switch(currentSort){



        case "name":


            sorted.sort(
                (a,b)=>

                a.name.localeCompare(
                    b.name
                )

            );


            break;



        case "age":


            sorted.sort(
                (a,b)=>

                b.age - a.age

            );


            break;



        default:


            sorted.sort(
                (a,b)=>

                a.days_left_number -

                b.days_left_number

            );


    }



    return sorted;


}






/* ==========================================================
   STATISTICS
========================================================== */


function updateStatistics(data){



    setValue(
        "totalMembers",
        data.length
    );



    setValue(

        "importantMembers",

        data.filter(
            member=>member.important
        ).length

    );



    const month =

        new Date()
        .getMonth();



    setValue(

        "monthBirthdays",

        data.filter(member=>{


            if(!member.dob)
                return false;



            return (

                new Date(member.dob)
                .getMonth()

                ===

                month

            );


        }).length

    );




    setValue(

        "upcomingBirthdays",

        data.filter(
            member=>

            member.days_left_number <=30

        ).length

    );



    setValue(

        "memberCounterChip",

        `${data.length} Member${data.length !== 1 ? "s":""}`

    );


}






function setValue(id,value){


    const element =
        document.getElementById(id);



    if(element){

        element.textContent=value;

    }


}






/* ==========================================================
   RENDER MEMBERS
========================================================== */


function renderMembers(data){


    const container =

        document.getElementById(
            "birthdayCards"
        );



    if(!container)
        return;




    const sorted =

        sortMembers(data);




    if(sorted.length===0){


        container.innerHTML = `


        <div class="empty-card">


            <h2>

                👨‍👩‍👧 No Members Found

            </h2>


            <p>

                Add your first family member.

            </p>


        </div>


        `;


        return;

    }






    container.innerHTML =

        sorted

        .map(member=>

            MemberCard(member)

        )

        .join("");



    bindCardEvents();



}







/* ==========================================================
   SEARCH
========================================================== */


function initializeSearch(){


    const input =

        document.getElementById(
            "memberSearch"
        );



    if(!input)
        return;




    input.oninput = ()=>{


        const value =

            input.value
            .toLowerCase()
            .trim();




        filteredMembers =

            members.filter(member=>


                member.name
                .toLowerCase()
                .includes(value)


            );



        renderMembers(
            filteredMembers
        );


    };


}







/* ==========================================================
   SORT CONTROL
========================================================== */


function initializeSorting(){


    const select =

        document.getElementById(
            "sortMembers"
        );



    if(!select)
        return;



    select.onchange = ()=>{


        currentSort =
            select.value;



        renderMembers(
            filteredMembers
        );


    };


}






/* ==========================================================
   PAGE ACTIONS
========================================================== */


function initializeActions(){


    const addButton =

        document.getElementById(
            "addMember"
        );



    if (addButton) {
        addButton.addEventListener("click", () => {
            navigate("add");
        });
    }


}







/* ==========================================================
   CARD EVENTS
========================================================== */


/* ==========================================================
   CARD EVENTS
========================================================== */

function bindCardEvents(){


    document
        .querySelectorAll(".view-btn")
        .forEach((button) => {
            button.addEventListener("click", () => {
                sessionStorage.setItem(
                    "profileId",
                    button.dataset.id
                );
                localStorage.setItem(
                    "lastProfileId",
                    button.dataset.id
                );

                sessionStorage.removeItem(
                    "profileEdit"
                );

                navigate(
                    "profile"
                );
            });
        });





    document
        .querySelectorAll(".edit-btn")
        .forEach((button) => {
            button.addEventListener("click", () => {
                sessionStorage.setItem(
                    "profileId",
                    button.dataset.id
                );
                localStorage.setItem(
                    "lastProfileId",
                    button.dataset.id
                );

                sessionStorage.setItem(
                    "profileEdit",
                    "true"
                );

                navigate(
                    "profile"
                );
            });
        });





    document
        .querySelectorAll(".delete-btn")
        .forEach((button) => {
            button.addEventListener("click", () => {
                const id = button.dataset.id;
                const name = button.dataset.name;

                openDeleteModal(name, async () => {
                    try {
                        const response = await api.delete(`/delete/${id}`);
                        if (response.data && response.data.success) {
                            showToast("Member deleted successfully.", "success");
                        } else {
                            showToast(response.data?.message || "Unable to delete member.", "error");
                        }
                    } catch (err) {
                        console.error("Delete failed:", err);
                        showToast("Unable to delete member.", "error");
                    }

                    await loadMembers();
                });
            });
        });


}







/* ==========================================================
   STATES
========================================================== */


function showLoading(){


    const container =

        document.getElementById(
            "birthdayCards"
        );



    if(container){


        container.innerHTML = `


        <div class="empty-card">

            Loading family members...

        </div>


        `;


    }


}





function showError(){


    const container =

        document.getElementById(
            "birthdayCards"
        );



    if(container){


        container.innerHTML = `


        <div class="empty-card">

            ❌ Failed to load members

        </div>


        `;


    }


}