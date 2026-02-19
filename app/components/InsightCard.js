

function InsightCard({icon, title,text}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="font-bold text-gray-700">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )
}

export default InsightCard

