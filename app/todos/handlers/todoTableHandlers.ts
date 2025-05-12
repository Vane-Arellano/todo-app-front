/**
 * Calculates the CSS class for the due date based on its proximity to the current date.
 *
 * @param {string | null} dueDate - The due date as a string in ISO format or null if no due date is provided.
 * @returns {string} - A CSS class representing the background color based on the due date:
 *   - Red (`bg-[#D67172]`) if the due date is in the past or within 1 week.
 *   - Yellow (`bg-[#FFECA1]`) if the due date is within 2 weeks.
 *   - Green (`bg-[#91AC87]`) if the due date is more than 2 weeks away.
 *   - Empty string if no due date is provided.
 * @see TasksTable [../components/TasksTable.tsx]
 */
export const calculateDueDateClass = (dueDate: string | null): string => {
    if (!dueDate) return ""; // No due date, no background color
  
    const today = new Date();
    const due = new Date(dueDate);
    const diffInTime = due.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert from milliseconds to days
  
    if (diffInDays < 0) {
      return "bg-[#D67172] hover:none";
    } else if (diffInDays <= 7) {
      return "bg-[#D67172] hover:none"; 
    } else if (diffInDays <= 14) {
      return "bg-[#FFECA1] hover:none"; 
    } else {
      return "bg-[#91AC87] hover:none"; 
    }
  };