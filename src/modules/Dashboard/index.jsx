import { Card } from '../../components';
import { Button } from '../../atoms';

const data = [
  { title: 'Users', value: 1234 },
  { title: 'Sales', value: '$12,345' },
  { title: 'Visits', value: 5678 },
];

export const Dashboard = () => (
  <div className="p-6">
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Button onClick={() => alert('Refreshed!')}>Refresh</Button>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map(item => (
        <Card key={item.title} title={item.title} value={item.value} />
      ))}
    </div>
  </div>
);
