import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'

type Subject={
    _id:string;
    title:string;
}

type Props={
    subjects:Subject[]
}

const Sidebar = ({subjects}:Props) => {
    const navigate=useNavigate()
    const {id}=useParams()
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        padding: "12px",
        overflowY: "auto"
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Subjects</h2>
        <p style={{ fontSize: "12px", color: "gray" }}>
          Your lecture workspace
        </p>
      </div>

      {/* Subject list */}
      {subjects.map((sub) => {
        const isActive = id === sub._id;

        return (
          <div
            key={sub._id}
            onClick={() => navigate(`/subject/${sub._id}`)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: isActive
                ? "#e6f0ff"
                : "transparent",
              border: isActive
                ? "1px solid #3b82f6"
                : "1px solid transparent"
            }}
          >
            {sub.title}
          </div>
        );
      })}

      {/* Empty state */}
      {subjects.length === 0 && (
        <p style={{ color: "gray", fontSize: "13px" }}>
          No subjects yet. Upload a lecture image to auto-create one.
        </p>
      )}
    </div>
  )
}

export default Sidebar