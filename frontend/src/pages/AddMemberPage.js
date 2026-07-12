/* ==========================================================
   ADD MEMBER PAGE

   UI Layer Only
========================================================== */


import { initializeAddMember } from "../components/AddMemberManager.js";



function renderHeader(){

    return `

    <div class="page-header">


        <div>


            <span class="page-badge">

                🎂 Birthday Manager

            </span>



            <h1>

                Add New Birthday

            </h1>



            <p>

                Save birthdays of your loved ones securely inside your Family Vault.

            </p>


        </div>



        <button

            data-page="dashboard"

            class="secondary-btn"

        >

            ← Dashboard

        </button>


    </div>

    `;

}





export function AddMemberPage(){



    setTimeout(()=>{


        initializeAddMember();



    },0);



    return `


    <div class="add-member-page">


        ${renderHeader()}



        <div class="form-container">


            <div class="form-card premium-form">


                <div class="form-heading">


                    <div class="form-icon">

                        🎂

                    </div>



                    <div>


                        <h2>

                            Birthday Information

                        </h2>



                        <p>

                            Fill the details below to save a family member.

                        </p>


                    </div>


                </div>



                <div id="memberFormContainer">


                </div>



            </div>


        </div>


    </div>


    `;


}