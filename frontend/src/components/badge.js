export function relationshipBadge(relationship = "") {

    const value = relationship.toLowerCase();

    let color = "#64748b";

    switch (value) {

        case "father":
            color = "#2563eb";
            break;

        case "mother":
            color = "#ec4899";
            break;

        case "brother":
            color = "#06b6d4";
            break;

        case "sister":
            color = "#8b5cf6";
            break;

        case "grandfather":
            color = "#f59e0b";
            break;

        case "grandmother":
            color = "#ef4444";
            break;

        case "friend":
            color = "#10b981";
            break;

        default:
            color = "#64748b";

    }

    return `

        <span
            class="relationship-badge"
            style="background:${color}20;color:${color};">

            ${relationship || "Family"}

        </span>

    `;

}