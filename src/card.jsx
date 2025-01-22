function Card({title,subtitle,bgcolor}) {
  return (
    <div className={`rounded-lg px-4 py-4 border-1 ${bgcolor} shadow-md shadow-gray-500`}>
      <h1 className="text-3xl font-bold pb-2 sm:text-md md:text-xl lg:2xl xl:text-2xl">{title}</h1>
      <h1 className="text-2xl font-semibold sm:text-sm md:text-lg lg:xl xl:text-1xl">{subtitle}</h1>
    </div>
  );
}

export default Card;

const DynamicTable = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      moduleNumber: "MOD-001",
      fault: "Connection Error",
      condition: "Critical",
    },
    {
      id: 2,
      name: "Jane Smith",
      moduleNumber: "MOD-002",
      fault: "Power Failure",
      condition: "Warning",
    },
    {
      id: 3,
      name: "Mike Johnson",
      moduleNumber: "MOD-003",
      fault: "Sensor Error",
      condition: "Minor",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      moduleNumber: "MOD-004",
      fault: "Network Error",
      condition: "Critical",
    },
    {
      id: 5,
      name: "Tom Brown",
      moduleNumber: "MOD-005",
      fault: "Battery Low",
      condition: "Warning",
    },
    {
      id: 6,
      name: "Emma Davis",
      moduleNumber: "MOD-006",
      fault: "System Error",
      condition: "Minor",
    },
    {
      id: 7,
      name: "James Miller",
      moduleNumber: "MOD-007",
      fault: "Hardware Error",
      condition: "Critical",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      moduleNumber: "MOD-008",
      fault: "Software Error",
      condition: "Warning",
    },
  ];

  // Function to get condition-based styling
  const getConditionStyle = (condition) => {
    switch (condition.toLowerCase()) {
      case "critical":
        return "text-red-500 font-medium";
      case "warning":
        return "text-yellow-500 font-medium";
      case "minor":
        return "text-green-500 font-medium";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">System Status Table</h2>
        <div className="h-96 overflow-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-20">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-40">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-32">
                  Module Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-40">
                  Fault
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-32">
                  Condition
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.moduleNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.fault}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${getConditionStyle(
                      row.condition
                    )}`}
                  >
                    {row.condition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


