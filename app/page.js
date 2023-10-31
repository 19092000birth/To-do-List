// "use client";
// import React, { useState } from "react";

// const page = () => {
//   const [title, settitle] = useState("");
//   const [desc, setdesc] = useState(""); // variable
//   const [mainTask, setMainTask] = useState([]);
//   const submitHandler = (e) => {
//     e.preventDefault(); // to handle the submit
//     setMainTask([...mainTask, { title, desc }]);
//     settitle(""); //to make the data again empty after submitting
//     setdesc("");
//   };
//   const deleteHandler = (i) => {
//     let copytask = [...mainTask];
//     copytask.splice(i, 1); // Corrected this line
//     setMainTask(copytask);
//   };

//   let renderTask = <h2>No Task Available Yet</h2>;

//   if (mainTask.length > 0) {
//     renderTask = mainTask.map((t, i) => {
//       return (
//         <li key={i} className="flex items-center justify-between">
//           <div className="flex justify-between mb-5 w-2/3">
//             <h5 className="text-2xl font-semibold">{t.title}</h5>
//             <h4 className="text-xl font-semibold">{t.desc}</h4>
//           </div>
//           <button
//             onClick={() => {
//               deleteHandler(i);
//             }}
//             className="bg-red-400 text-white px-4 py-2 corner-rounded font-bold"
//           >
//             Delete
//           </button>
//         </li>
//       );
//     });
//   }
//   return (
//     <>
//       <h1 className="bg-black text-white p-5 font-bold text-5l text-center">
//         Vineet's To Do List
//       </h1>
//       <form onSubmit={submitHandler}>
//         <input
//           type="text"
//           className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
//           placeholder="Enter Title Here"
//           value={title}
//           onChange={(e) => {
//             settitle(e.target.value);
//           }}
//         />
//         <input
//           type="text"
//           className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
//           placeholder="Enter description Here"
//           value={desc}
//           onChange={(e) => {
//             setdesc(e.target.value);
//           }}
//         />
//         <button className="bg-black text-white p-5 text-2xl font-bold">
//           Add Task
//         </button>
//       </form>
//       <hr />
//       <div className="p-8 bg-slate-200">
//         <ul>{renderTask}</ul>
//       </div>
//     </>
//   );
// };

// export default page;
"use client";
import React, { useState } from "react";
import jsPDF from "jspdf";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") {
      alert("Please enter both title and description.");
      return; // Exit the function if the fields are empty
    }
    if (editingIndex === -1) {
      setMainTask([...mainTask, { title, desc }]);
    } else {
      const updatedTask = { title, desc };
      let updatedTasks = [...mainTask];
      updatedTasks[editingIndex] = updatedTask;
      setMainTask(updatedTasks);
      setEditingIndex(-1);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const updateHandler = (i) => {
    const taskToUpdate = mainTask[i];
    setTitle(taskToUpdate.title);
    setDesc(taskToUpdate.desc);
    setEditingIndex(i);
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    doc.text("Vineet's To-Do List", 10, 10);

    mainTask.forEach((task, index) => {
      const y = 20 + index * 30;
      doc.text(`Title: ${task.title}`, 10, y);
      doc.text(`Description: ${task.desc}`, 10, y + 10);
    });

    doc.save("ToDoList.pdf");
  };

  let renderTask = <h2>No Task Available Yet</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between">
          <div className="flex justify-between mb-5 w-2/3">
            <h5 className="text-2xl font-semibold">{t.title}</h5>
            <h4 className="text-xl font-semibold">{t.desc}</h4>
          </div>
          <div>
            <button
              onClick={() => deleteHandler(i)}
              className="bg-red-400 text-white px-4 py-2 corner-rounded font-bold mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => updateHandler(i)}
              className="bg-blue-400 text-white px-4 py-2 corner-rounded font-bold"
            >
              Update
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 font-bold text-5xl text-center">
        Vineet's To-Do List
      </h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button className="bg-black text-white p-5 text-2xl font-bold">
          {editingIndex === -1 ? "Add Task" : "Update Task"}
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
      <button
        onClick={downloadAsPDF}
        className="bg-green-400 text-white p-4 text-2xl font-bold"
      >
        Download as PDF
      </button>
    </>
  );
};

export default Page;
