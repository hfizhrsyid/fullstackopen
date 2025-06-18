import Part from "./Part"

const Content = ({ parts }) => {
  const total = () => parts.reduce((s, p) => s + p.exercises, 0)
  
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <h2>total of {total()} exercises</h2>
    </div>
  )
}

export default Content