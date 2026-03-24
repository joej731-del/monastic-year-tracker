import { useState, useEffect } from 'react'

export default function App() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [date, setDate] = useState(new Date().toLocaleDateString())

  useEffect(() => {
    const saved = localStorage.getItem("monastic-data")
    if (saved) setChecked(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("monastic-data", JSON.stringify(checked))
  }, [checked])

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const tasks = [
    "Morning Walk / Run",
    "Film Daily Clip",
    "Meditation + Yoga",
    "Edit + Post Short",
    "Work / School",
    "Family Time",
    "Dinner",
    "Read",
    "Evening Meditation"
  ]

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 500, margin: "0 auto" }}>
      <h1>Monastic Year Tracker</h1>
      <p>{date}</p>

      {tasks.map(task => (
        <div key={task} style={{ marginBottom: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              type="checkbox"
              checked={!!checked[task]}
              onChange={() => toggle(task)}
            />
            {task}
          </label>
        </div>
      ))}
    </div>
  )
}
