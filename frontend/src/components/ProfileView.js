/* ==========================================================
   PROFILE VIEW

   UI Component Only

   Responsibilities:
   - Render profile information
   - Generate profile HTML

   Does NOT:
   - Call API
   - Handle events
   - Manage state

========================================================== */


import { relationshipBadge } from "./badge.js";



/* ==========================================================
   RENDER PROFILE VIEW
========================================================== */


export function renderProfileView(person){


    const initial =

        person.name

        ?

        person.name
        .charAt(0)
        .toUpperCase()

        :

        "?";



    return `


<div class="profile-container">


    <!-- PROFILE BANNER -->


    <div class="profile-banner">


        <div class="profile-avatar-large">


            ${initial}


        </div>


    </div>





    <!-- PROFILE BODY -->


    <div class="profile-body">


        <div class="profile-intro">

            <div class="profile-intro-copy">

                <h1 class="profile-name">


                    ${person.name}


                </h1>





        ${

            relationshipBadge(
                person.relationship || ""
            )

        }





                <div class="profile-highlight">


                    🎂 ${person.days_left || "No upcoming birthday"}


                </div>

            </div>

            <div class="profile-summary-grid">

                ${renderStatBox("🎈","Age", cleanAge(person.age))}

                ${renderStatBox("⏳","Next Birthday", person.days_left || "-")}

                ${renderStatBox("💫","Important", person.important ? "Yes" : "No")}

            </div>

        </div>







        <!-- INFORMATION GRID -->


        <div class="profile-grid">



            ${

                renderStatBox(

                    "🎂",

                    "Date of Birth",

                    person.formatted_dob

                )

            }




            ${

                renderStatBox(

                    "🎈",

                    "Age",

                    cleanAge(person.age)

                )

            }




            ${

                renderStatBox(

                    "⏳",

                    "Next Birthday",

                    person.days_left

                )

            }




            ${

                renderInfoBox(

                    "📞",

                    "Phone",

                    person.phone

                )

            }




            ${

                renderInfoBox(

                    "📧",

                    "Email",

                    person.email

                )

            }




            ${

                renderInfoBox(

                    "🎨",

                    "Favourite Colour",

                    person.favorite_color

                )

            }




            ${

                renderInfoBox(

                    "🎁",

                    "Favourite Gift",

                    person.favorite_gift

                )

            }




            ${

                renderInfoBox(

                    "⭐",

                    "Important",

                    person.important
                    ?

                    "Yes ⭐"

                    :

                    "No"

                )

            }



        </div>






        <!-- NOTES -->


        <div class="info-box notes-box">


            <h4>

                📝 Notes

            </h4>



            <p>

                ${

                    person.notes

                    ||

                    "No notes available."

                }


            </p>


        </div>








        <!-- ACTIONS -->


        <div class="profile-actions">


            <button

                id="editProfile"

                class="hero-btn"

            >

                ✨ Edit Profile

            </button>





            <button

                id="deleteProfile"

                class="danger-btn"

            >

                🗑 Delete Member

            </button>



        </div>



    </div>


</div>


`;

}






/* ==========================================================
   STAT BOX
========================================================== */


function renderStatBox(icon,title,value){


    return `


    <div class="info-box stat-info">


        <div class="info-icon">


            ${icon}


        </div>



        <div>


            <span class="info-title">


                ${title}


            </span>



            <p class="info-value">


                ${value || "-"}


            </p>


        </div>



    </div>


    `;

}







/* ==========================================================
   INFO BOX
========================================================== */


function renderInfoBox(icon,title,value){


    return `


    <div class="info-box">


        <h4>


            ${icon}

            ${title}


        </h4>



        <p>


            ${value || "Not Added"}


        </p>


    </div>


    `;

}







/* ==========================================================
   AGE FORMATTER
========================================================== */


function cleanAge(age){


    if(!age)

        return "-";



    return String(age)

        .replace(
            /\s*Years$/i,
            ""
        );


}