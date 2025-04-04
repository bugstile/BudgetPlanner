# **BudgetPlanner**  

BudgetPlanner is a dynamic and interactive financial dashboard built with **React**. It allows users to track their finances, set savings goals, and organize expenses by category. 
Worth mentioning is the application is not complete and **all financing and saving goals is not ready for release**
The app offers a sleek, responsive UI styled with **Tailwind CSS** and **ShadCN**, state management via **Redux Toolkit**, and routing with **React Router**.

## 🚀 **Features**  

- **Categorization:**  
  Organize your expenses by categories such as entertainment, healthcare, and transportation to make better financial decisions.

- **GenericTable.jsx — Dynamic Data Table Component**
  The GenericTable component is a highly flexible and reusable table implementation that can display data with sorting, pagination, row selection (checkboxes), and actions like editing and deleting. 
  It supports dynamic content, allowing users to manage and manipulate data in a straightforward, user-friendly way.

- **Modern UI Design:**  
  Tailored for a seamless experience, the UI is fully responsive, designed using **Tailwind CSS**.  

- **State Management:**  
  Leveraging **Redux Toolkit** for effective and scalable state management.  

- **React Router Integration:**  
  Enables smooth navigation within the app, including the ability to handle different routes for expenses, goals, and more.

## 📂 **Installation & Setup**  

Follow the steps below to get the project up and running locally:

### 1. Clone the Repository  
Clone the repo to your local machine:  
```bash  
git clone https://github.com/bugstile/BudgetPlanner.git  
```  

### 2. Install Dependencies  
After cloning the repository, navigate into the project directory and install the required dependencies:  
```bash  
cd BudgetPlanner  
npm install  
```  

### 3. Start the Development Server  
Launch the app on your local server:  
```bash  
npm run dev  
```  
The app will now be accessible at [http://localhost:5173](http://localhost:5173).  

## 🛠️ **Tech Stack**  

- **React** — JavaScript library for building user interfaces.  
- **Redux Toolkit** — State management library for React applications.  
- **Tailwind CSS** — Utility-first CSS framework for rapid UI development.  
- **React Router** — Declarative routing for React.js.  
- **Zod** — TypeScript-first schema validation library for form validation.  

## 📁 **Project Structure**  

Here’s an overview of the project folder structure:  

```bash
.
├── public/                   # Public files (e.g., index.html)
├── src/                      # Application source code
│   ├── components/           # Reusable components (Button, Form, etc.)
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Different pages of the app (Home, Expenses, etc.)
│   ├── store/                # Redux store and reducers
│   ├── styles/               # Tailwind CSS configurations
│   └── App.js                # Main app component
└── README.md                 # This file
```

- **Project Requirements Document:**  
  Overview of project requirements and goals: [Google Docs](https://docs.google.com/document/d/1H4eDuZfrzw68r0HXZTlOL5OC27io28WSMaKc7NazzCg/edit?tab=t.0)

## 🎯 **Future Improvements**  

While the app provides a solid foundation for financial management, there are plans to enhance its functionality further:

- **Expense Tracking:**  
  Keep track of your income and expenses, categorize them, and gain insights into spending habits.

- **Savings Goals:**  
  Set specific savings goals for different time periods (e.g., monthly, yearly) and track your progress over time.  

- **Authentication:**  
  Introduce user authentication (e.g., login and signup) to enable multiple users with personalized dashboards.  

- **Export Data:**  
  Add the ability to export data as CSV or PDF for offline tracking and reporting.  

- **Mobile App:**  
  Develop a mobile version of the app using React Native or a similar framework.  

Here's an example of how you can document your `GenericTable.jsx` component for your GitHub project. It will provide a detailed overview of the component's functionality, usage, and key features.

---

## 🚀 **Highlighted feature**  


## `GenericTable.jsx` — Dynamic Data Table Component (built on shadCN implementation)

The `GenericTable` component is a highly flexible and reusable table implementation that can display data with sorting, pagination, row selection (checkboxes), and actions like editing and deleting. It supports dynamic content, allowing users to manage and manipulate data in a straightforward, user-friendly way.

### Features:
- **Sorting**: Allows sorting of rows based on column headers.
- **Pagination**: Supports pagination for large datasets.
- **Checkbox Selection**: Option to select rows for bulk actions (e.g., delete selected rows).
- **Actions Dropdown**: Each row includes a dropdown with options to edit or delete the row.
- **Bulk Deletion**: Option to delete multiple rows at once after selecting them.
- **Customizable**: Custom delete action and message via props.

### Key Props:
- `data` (Array): The data to be displayed in the table. Each object in the array represents a row.
- `columns` (Array): Defines the columns of the table. Each column can define its header and cell rendering logic.
- `onEdit` (Function): A callback function that is called when the user clicks on "Edit" in the row's action dropdown. This function should handle editing logic.
- `onDelete` (Function): A callback function that is called when the user clicks on "Delete" in the row's action dropdown. This function should handle single-row deletion logic.
- `deleteAllSelected` (Function): A callback function that is triggered when the "Delete All Selected" button is clicked. It deletes multiple rows that are selected via checkboxes.
- `showCheckboxes` (Boolean): Whether checkboxes should be displayed for row selection. Defaults to `false`.
- `enablePagination` (Boolean): Whether pagination is enabled. Defaults to `true`.
- `deleteCategory` (Function): A custom function that handles the deletion of selected rows. It is passed dynamically and should be responsible for deleting the data.
- `deleteMessage` (String): A custom message to display in the delete confirmation dialog when deleting multiple rows.

### Component Workflow:
1. **Rendering Table**: The table renders headers, body, and actions dynamically based on the `columns` and `data` passed as props.
2. **Checkbox Selection**: When enabled, each row has a checkbox for selection. A master checkbox in the header allows selecting/deselecting all rows on the current page.
3. **Actions**: Each row has an action dropdown with options to **Edit** or **Delete** the corresponding row. Clicking on "Delete" will prompt the user for confirmation.
4. **Bulk Delete**: The table supports bulk deletion of rows. After selecting rows via checkboxes, the "Delete All Selected" button will trigger a confirmation dialog. If confirmed, the selected rows are deleted.
5. **Pagination**: If `enablePagination` is enabled, pagination buttons allow navigation between pages of data.

### Example Usage:

```jsx
import GenericTable from "./components/GenericTable";

const columns = [
  {
    header: "Category",
    accessor: "category",
  },
  {
    header: "Amount",
    accessor: "totalAmount",
  },
  {
    header: "Date",
    accessor: "dateSpent",
  },
];

const data = [
  {
    id: 1,
    category: "Food",
    totalAmount: 50,
    dateSpent: "2025-03-28",
  },
  {
    id: 2,
    category: "Transport",
    totalAmount: 100,
    dateSpent: "2025-03-29",
  },
  // More data here
];

const handleEdit = (row) => {
  // Logic to edit the row
};

const handleDelete = (id) => {
  // Logic to delete the row
};

const handleDeleteAllSelected = (selectedIds) => {
  // Logic to delete selected rows
};

<GenericTable
  data={data}
  columns={columns}
  onEdit={handleEdit}
  onDelete={handleDelete}
  deleteAllSelected={handleDeleteAllSelected}
  showCheckboxes={true}
  deleteMessage="categories"
/>
```

### Table Structure:
- **Table Header**: Displays the column headers dynamically based on the `columns` prop.
- **Table Body**: Displays the rows dynamically based on the `data` prop.
- **Action Dropdown**: Each row has an action dropdown (using a `MoreHorizontal` icon) with options to **Edit** and **Delete**.

### Bulk Deletion:
- The component includes a button to delete all selected rows. This triggers a confirmation dialog to confirm the action before proceeding with the deletion.

### State Management:
- **`selectedCategoryIds`**: Keeps track of the IDs of selected rows for bulk deletion.
- **`showDeleteConfirmation`**: Controls the visibility of the confirmation dialog for bulk deletion.

### Dependencies:
- **@tanstack/react-table**: A powerful table library for React that handles table state, sorting, pagination, and row selection.
- **Lucide-React (MoreHorizontal icon)**: For the dropdown trigger icon.
- **Custom UI Components**: Custom `Checkbox`, `Button`, `Table`, `DropdownMenu`, and `ConfirmationDialog` components to build the table UI.

### Customization:
You can easily customize the table's appearance, the actions, and the data handling logic by adjusting the props passed to the `GenericTable` component. The component is designed to be flexible and reusable, allowing for easy integration into any React project.