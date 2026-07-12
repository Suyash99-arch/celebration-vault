/* ==========================================================
   MEMBERS PAGE

   UI Layer Only

   Responsibilities:
   - Render page structure
   - Start MembersManager

========================================================== */


import { loadMembers } from "../components/MembersManager.js";



/* ==========================================================
   PAGE HEADER
========================================================== */

function renderHeader(){

    return `

    <div class="family-header">


        <div>


            <span class="page-badge">

                👨‍👩‍👧 Family Directory

            </span>



            <h1>

                Members

            </h1>



            <p>

                Manage every birthday, anniversary and memory from one beautiful place.

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




/* ==========================================================
   TOOLBAR
========================================================== */


function renderToolbar(){

    return `


    <div class="family-toolbar">


        <div class="search-member-box">


            🔍


            <input

                id="memberSearch"

                type="text"

                placeholder="Search by name..."

            />


        </div>





        <select

            id="sortMembers"

            class="secondary-btn"

        >


            <option value="upcoming">

                Upcoming Birthday

            </option>



            <option value="name">

                Name

            </option>



            <option value="age">

                Age

            </option>



        </select>





        <button

            id="addMember"

            class="hero-btn"

        >

            ➕ Add Member

        </button>



    </div>


    `;

}







/* ==========================================================
   STATISTICS
========================================================== */


function renderStatistics(){


    const stats=[


        ["👨‍👩‍👧","totalMembers","Total Members"],


        ["⭐","importantMembers","Important"],


        ["🎂","monthBirthdays","This Month"],


        ["⏳","upcomingBirthdays","Upcoming"]


    ];



    return `


    <section class="stats-grid family-stats">


        ${

            stats.map(item=>`


            <div class="stat-card">


                <div class="icon">

                    ${item[0]}

                </div>



                <div>


                    <h2 id="${item[1]}">

                        0

                    </h2>



                    <p>

                        ${item[2]}

                    </p>


                </div>


            </div>


            `).join("")


        }


    </section>


    `;


}







/* ==========================================================
   COLLECTION
========================================================== */


function renderCollection(){


    return `


    <div class="members-section-header">


        <div>


            <h2>

                👨‍👩‍👧 Family Collection

            </h2>



            <p>

                Showing every saved family member in your Birthday Vault.

            </p>


        </div>





        <span

            class="member-count-chip"

            id="memberCounterChip"

        >

            0 Members

        </span>



    </div>




    <div

        id="birthdayCards"

        class="profile-grid"

    >


        <div class="empty-card">

            Loading family members...

        </div>


    </div>


    `;

}








/* ==========================================================
   PAGE EXPORT
========================================================== */


export function MembersPage(){



    setTimeout(()=>{


        loadMembers();



    },0);




    return `


    <div class="family-page">


        ${renderHeader()}


        ${renderToolbar()}


        ${renderStatistics()}


        ${renderCollection()}



    </div>


    `;


}