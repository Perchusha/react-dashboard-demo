export const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2">{value}</p>
  </div>
);
